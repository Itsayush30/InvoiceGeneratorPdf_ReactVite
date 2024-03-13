import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDFDownloadLink from react-pdf
import PDFInvoice from './PDFInvoice'; // Import your PDF component

const Invoice = () => {
  const [product, setProduct] = useState({ product: "", qty: "", rate: "" });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleProductChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.post('http://localhost:3010/api/v1/invoice', product, {
        headers: {
          'x-access-token': token // Add token to header
        }
      });
      console.log('Invoice added successfully:', response.data);
    } catch (error) {
      console.error('Failed to add invoice:', error);
    }
  };

  const handleAddAnotherProduct = () => {
    setProduct({ product: "", qty: "", rate: "" }); // Clear input fields
    navigate('/invoice'); // Navigate to the invoice page
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add Product Details</h1> {/* Heading */}
        <div className="mb-4">
          <input
            type="text"
            value={product.product}
            onChange={(e) => handleProductChange("product", e.target.value)}
            placeholder="Product Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="text"
            value={product.qty}
            onChange={(e) => handleProductChange("qty", e.target.value)}
            placeholder="Quantity"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="text"
            value={product.rate}
            onChange={(e) => handleProductChange("rate", e.target.value)}
            placeholder="Rate"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button onClick={handleSubmit} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-600">Add Product</button>
        <button onClick={() => navigate('/generatepdf')} className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">Generate PDF</button>
        <button onClick={handleAddAnotherProduct} className="mt-4 w-full bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-600">Add Another Product</button> {/* Button to add another product */}
      </div>
    </>
  );
};

export default Invoice;
