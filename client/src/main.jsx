import React from "react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import App from "./App.jsx";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConvexAuthProvider client={convex}>
        <App />
        <Toaster />
      </ConvexAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
