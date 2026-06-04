import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PCOSRecommendations.css";

const getRiskLevel = (score) => {
  if (score <= 5) return "LOW";
  if (score <= 12) return "MEDIUM";
  return "HIGH";
};

const recommendations = {
  LOW: {
    title: "Low PCOS Risk",
    color: "green",
    advice: [
      "Maintain a balanced diet",
      "Exercise 30 minutes daily",
      "Track periods regularly",
    ],
    diet: ["Whole grains", "Fruits", "Vegetables"],
    exercise: ["Walking", "Yoga", "Surya Namaskar"],
    action: "Preventive Care",
  },

  MEDIUM: {
    title: "Moderate PCOS Risk",
    color: "orange",
    advice: [
      "Lifestyle changes needed",
      "Weight management is important",
      "Monitor symptoms monthly",
    ],
    diet: ["Low GI foods", "Protein-rich meals"],
    exercise: ["Strength training", "Yoga", "Cardio"],
    action: "Lifestyle Correction",
  },

  HIGH: {
    title: "High PCOS Risk",
    color: "red",
    advice: [
      "Consult a gynecologist",
      "Blood tests may be required",
      "Strict lifestyle changes needed",
    ],
    diet: ["Anti-inflammatory foods", "Low sugar"],
    exercise: ["Doctor-approved workouts"],
    action: "Medical Attention Required",
  },
};

export default function PCOSRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score } = location.state || {};

  console.log("Received state:", location.state); // Debugging log

  // Fallback safety
  if (score === undefined) {
    return (
      <div className="pcos-rec-page">
        <h2>No PCOS data found</h2>
        <p>Please complete the PCOS test first</p>
        <button 
          onClick={() => navigate("/pcos-test")}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Go Back to Test
        </button>
      </div>
    );
  }

  const riskLevel = getRiskLevel(score);
  const data = recommendations[riskLevel];

  return (
    <div className="pcos-rec-page premium-ui">
      {/* HEADER */}
      <header className="pcos-rec-header">
        <button 
          className="back-btn" 
          onClick={() => navigate("/health")}
          style={{ marginBottom: 20 }}
        >
          ← Back to Dashboard
        </button>
        <h1>Your Personalized PCOS Care Plan</h1>
        <p>
          Based on your responses, here are evidence-based recommendations
          tailored to your hormonal health.
        </p>
      </header>

      {/* SUMMARY CARD */}
      <section className="pcos-summary glass">
        <h2>PCOS Risk Assessment</h2>
        {/* <p className="risk-level">{riskLevel}</p> */}
        <p className="risk-percent"><h3>{score}% Risk Score</h3></p>
        <small>
          This assessment helps identify possible hormonal imbalance patterns.
        </small>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="pcos-rec-grid">
        <div className="pcos-rec-card">
          <h3>🥗 Nutrition Focus</h3>
          <ul>
            {data.diet.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pcos-rec-card">
          <h3>🏃‍♀ Physical Activity</h3>
          <ul>
            {data.exercise.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pcos-rec-card">
          <h3>🧘 Lifestyle Care</h3>
          <ul>
            {data.advice.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pcos-rec-card">
          <h3>🩺 Medical Guidance</h3>
          <ul>
            {riskLevel === "HIGH" && (
              <>
                <li>Consult a gynecologist/endocrinologist</li>
                <li>Hormonal blood tests if advised</li>
                <li>Ultrasound if symptoms persist</li>
                <li>Avoid self-medication</li>
              </>
            )}
          </ul>
        </div>
      </section>

      {/* ACTIONS */}
      <div className="pcos-rec-actions">
        <button onClick={() => window.print()}>
          🖨 Download / Print
        </button>
        <button
          className="secondary"
          onClick={() => navigate("/health")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
