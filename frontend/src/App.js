import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard";
import EmergencyContacts from "./pages/EmergencyContacts";
import PCOS from "./pages/PCOS";
import PCOSTest from "./pages/PCOSTest.jsx";
import PeriodTracker from "./pages/PeriodTracker";
import ProductComparison from "./pages/ProductComparison";
import Education from "./pages/Blogs/Education/Education.jsx";
import Health from "./pages/Health";
import BlogDetail from "./pages/Blogs/BlogDetail";
import PCOSRecommendations from "./pages/PCOSRecommendations.jsx";
import SafetyMap from "./pages/SafetyMap";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<EmergencyContacts />} />
        <Route path="/health" element={<Health />} />
        <Route path="/health/pcos" element={<PCOS />} />
        <Route path="/pcos/test" element={<PCOSTest />} />
        <Route path="/health/period-tracker" element={<PeriodTracker />} />
        <Route path="/health/products" element={<ProductComparison />} />
        <Route path="/health/education" element={<Education />} />
        <Route path="/blogs" element={<Education />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/pcos/recommendations" element={<PCOSRecommendations />} />
        <Route path="/safety" element={<SafetyMap />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
