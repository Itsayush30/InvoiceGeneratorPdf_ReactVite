import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3010/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("here", data);
      setResponse(data);

      // If the response indicates success, navigate to "/invoice"
      if (data && data.success) {
        // Store the token in local storage
        localStorage.setItem("token", data.data);
        //console.log(data.data)
        navigate("/invoice");
      }

    } catch (error) {
      console.error("Error:", error);
      setResponse(null);
    }
  };

  return (
    <div className="m-64 max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md ">
      <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </label>
        <button
          type="submit"
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          SignIn
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <p>Success: {response.success.toString()}</p>
          <p>Message: {response.error.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
