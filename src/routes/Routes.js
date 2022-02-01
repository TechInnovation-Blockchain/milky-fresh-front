import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/Home";
import FarmsPage from "../components/Farms";
import TradePage from "../components/Trade";
import AdminPage from "../components/AdminPanel/AdminPanel";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/swap" element={<TradePage />} />
      <Route path="/farm" element={<FarmsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" index element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
