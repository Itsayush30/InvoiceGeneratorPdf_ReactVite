import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Registration from "./components/Registration";
import Invoice from "./components/Invoice";
import GeneratePdf from "./components/GeneratePdf";
import Body from "./components/Body";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Registration />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "generatepdf",
        element: <GeneratePdf />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
