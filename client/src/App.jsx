import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AdventureProvider } from "./context/AdventureContext";

export default function App() {
  return (
    <BrowserRouter>
      <AdventureProvider>
        <AppRoutes />
      </AdventureProvider>
    </BrowserRouter>
  );
}
