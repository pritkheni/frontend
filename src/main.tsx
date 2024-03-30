import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AddProd from "./pages/AddProd.tsx";

import ProdutsPage from "./pages/ProdutsPage.tsx";
import DetailProductPage from "./pages/DetailProductPage.tsx";
import UpdatePage from "./pages/UpdatePage.tsx";
// import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProdutsPage />} />
        <Route path="/newProducat" element={<AddProd />} />
        <Route path="/updateProduct/:productId" element={<UpdatePage />} />
        <Route path="/product/:productId" element={<DetailProductPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
