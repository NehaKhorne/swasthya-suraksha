import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PCOS.css";
import heroBg from "../assets/pcos-hero-bg.png";


const questions = [
  { q: "Are your menstrual cycles usually longer than 35 days?", options: ["Yes", "No"], scores: [2, 0] },
  { q: "Do you miss periods for 2 months or more (not pregnant)?", options: ["Yes", "No"], scores: [2, 0] },
  { q: "Have your periods been irregular since puberty?", options: ["Yes", "No"], scores: [2, 0] },
  { q: "Do you experience very light or very heavy bleeding?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Do you have fewer than 8 periods per year?", options: ["Yes", "No"], scores: [2, 0] },

  { q: "Do you have excess facial or body hair?", options: ["None", "Mild", "Moderate", "Severe"], scores: [0, 1, 2, 3] },
  { q: "How often do you remove facial hair?", options: ["Never", "Sometimes", "Frequently"], scores: [0, 1, 2] },
  { q: "Do you have persistent acne after age 20?", options: ["No", "Mild", "Severe"], scores: [0, 1, 2] },
  { q: "Do you experience scalp hair thinning or hair fall?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Do you have oily skin with frequent breakouts?", options: ["Yes", "No"], scores: [1, 0] },

  { q: "Is your BMI above 25?", options: ["Yes", "No"], scores: [2, 0] },
  { q: "Have you experienced sudden or unexplained weight gain?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Do you have dark patches on neck or armpits?", options: ["Yes", "No"], scores: [2, 0] },
  { q: "Do you feel fatigue or cravings after meals?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Do you struggle to lose weight despite diet or exercise?", options: ["Yes", "No"], scores: [1, 0] },

  { q: "Have you had difficulty getting pregnant (if applicable)?", options: ["Yes", "No / Not applicable"], scores: [2, 0] },
  { q: "Do you have a family history of PCOS?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Is there a family history of diabetes or insulin resistance?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Did you gain weight soon after your first periods?", options: ["Yes", "No"], scores: [1, 0] },
  { q: "Have your symptoms worsened over time?", options: ["Yes", "No"], scores: [1, 0] },
];

const MAX_SCORE = 31;

export default function PCOS() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const handleSelect = (index, score) => {
    const updated = [...answers];
    updated[index] = score;
    setAnswers(updated);
  };

  const calculateRisk = () => {
    const totalScore = answers.reduce((sum, v) => sum + (v ?? 0), 0);
    const percentage = Math.round((totalScore / MAX_SCORE) * 100);

    let level = "Low Risk";
    if (percentage > 75) level = "High Risk";
    else if (percentage > 50) level = "Moderate Risk";
    else if (percentage > 25) level = "Mild Risk";

    setResult({ percentage, level });

    saveResult(percentage, level, totalScore);
  };

  const saveResult = async (percentage, level, totalScore) => {
    try {
      await fetch("http://localhost:5000/api/pcos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          score: totalScore,
          percentage,
          riskLevel: level,
          answers,
        }),
      });
    } catch (error) {
      console.error("Failed to save PCOS result");
    }
  };

  return (
    <div className="pcos-page">

      <button className="back-btn" onClick={() => navigate("/health")}>
        ← Back to Dashboard
      </button>

      <div
  className="hero"
  style={{
    backgroundImage: `url(${heroBg})`,
  }}
>
  <div className="hero-overlay">
    <h1>PCOS Risk Assessment</h1>
    <p>Clinically inspired screening questionnaire</p>
  </div>
</div>


      <div className="progress-wrapper">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="progress-text">
          {answeredCount} of {questions.length} answered
        </div>
      </div>

      <div className="questions-container">
        {questions.map((item, qIndex) => (
          <div className="question-card" key={qIndex}>
            <div className="question-title">
              Q{qIndex + 1}. {item.q}
            </div>

            <div className="options">
              {item.options.map((opt, i) => (
                <label className="option-pill" key={i}>
                  <input
                    type="radio"
                    name={`q-${qIndex}`}
                    checked={answers[qIndex] === item.scores[i]}
                    onChange={() => handleSelect(qIndex, item.scores[i])}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={calculateRisk}>
        View My Health Report
      </button>

      {result && (
        <div className="result-section">
          <h3>Your PCOS Risk Summary</h3>

          <div className="circle-container">
            <svg width="200" height="200">
              <circle cx="100" cy="100" r="80" className="bg" />
              <circle
                cx="100"
                cy="100"
                r="80"
                className={`progress ${result.level
                  .replace(" ", "")
                  .toLowerCase()}`}
                style={{
                  strokeDashoffset:
                    502 - (502 * result.percentage) / 100,
                }}
              />
            </svg>

            <div className="circle-text">
              <h2>{result.percentage}%</h2>
              <p>{result.level}</p>
            </div>
          </div>

          <button
            className="submit-btn"
            onClick={() =>
              navigate("/pcos/recommendations", {
                state: { score: result.percentage },
              })
            }
          >
            See My Recommendations →
          </button>
        </div>
      )}
    </div>
  );
}
