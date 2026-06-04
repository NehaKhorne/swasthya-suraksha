import { Link, useNavigate } from "react-router-dom";
import "./Health.css";

import heroImg from "../assets/health/hero.jpg";
import pcosImg from "../assets/health/pcos.jpg";
import periodImg from "../assets/health/period.jpg";
import productImg from "../assets/health/products.jpg";
import educationImg from "../assets/health/education.jpg";

export default function Health() {
  const navigate = useNavigate();

  return (
    <div className="health-container">

      {/* 🔙 Back */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {/* 🌸 Hero Section */}
      <div className="health-hero">
        <div className="hero-text">
          <h1>Women’s Health & Wellness</h1>
          <p>
            Empowering you with smart tools for cycle tracking, PCOS detection,
            product guidance, and health education.
          </p>
        </div>
        <img src={heroImg} alt="Women Health" />
      </div>

      {/* 🧬 Modules */}
      <div className="health-cards">

        <Link to="/health/pcos" className="health-card">
          <img src={pcosImg} alt="PCOS Predictor" />
          <div className="card-content">
            <h3>PCOS Predictor</h3>
            <p>AI-powered symptom analysis for early PCOS risk detection.</p>
          </div>
        </Link>

        <Link to="/health/period-tracker" className="health-card">
          <img src={periodImg} alt="Period Tracker" />
          <div className="card-content">
            <h3>Period Tracker</h3>
            <p>Monitor cycles and get accurate predictions for your next period.</p>
          </div>
        </Link>

        <Link to="/health/products" className="health-card">
          <img src={productImg} alt="Product Comparison" />
          <div className="card-content">
            <h3>Product Comparison</h3>
            <p>Compare menstrual products to find what suits you best.</p>
          </div>
        </Link>

        <Link to="/health/education" className="health-card">
          <img src={educationImg} alt="Education Hub" />
          <div className="card-content">
            <h3>Education Hub</h3>
            <p>Expert blogs & resources to guide your health journey.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
