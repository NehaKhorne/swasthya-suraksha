import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./PCOS.css";

const questions = [
	{
		q: "Are your menstrual cycles usually longer than 35 days?",
		options: ["Yes", "No"],
		scores: [2, 0],
	},
	{
		q: "Do you miss periods for 2 months or more (not pregnant)?",
		options: ["Yes", "No"],
		scores: [2, 0],
	},
	{
		q: "Have your periods been irregular since puberty?",
		options: ["Yes", "No"],
		scores: [2, 0],
	},
	{
		q: "Do you experience very light or very heavy bleeding?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Do you have fewer than 8 periods per year?",
		options: ["Yes", "No"],
		scores: [2, 0],
	},

	{
		q: "Do you have excess facial or body hair?",
		options: ["None", "Mild", "Moderate", "Severe"],
		scores: [0, 1, 2, 3],
	},
	{
		q: "How often do you remove facial hair?",
		options: ["Never", "Sometimes", "Frequently"],
		scores: [0, 1, 2],
	},
	{
		q: "Do you have persistent acne after age 20?",
		options: ["No", "Mild", "Severe"],
		scores: [0, 1, 2],
	},
	{
		q: "Do you experience scalp hair thinning or hair fall?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Do you have oily skin with frequent breakouts?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},

	{
		q: "Is your BMI above 25?",
		options: ["Yes", "No"],
		scores: [2, 0],
	},
	{
		q: "Have you experienced sudden or unexplained weight gain?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Do you have dark patches on neck or armpits?",
		options: ["Yes", "No"],
		scores: [2, 0],
	},
	{
		q: "Do you feel fatigue or cravings after meals?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Do you struggle to lose weight despite diet or exercise?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},

	{
		q: "Have you had difficulty getting pregnant (if applicable)?",
		options: ["Yes", "No / Not applicable"],
		scores: [2, 0],
	},
	{
		q: "Do you have a family history of PCOS?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Is there a family history of diabetes or insulin resistance?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Did you gain weight soon after your first periods?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
	{
		q: "Have your symptoms worsened over time?",
		options: ["Yes", "No"],
		scores: [1, 0],
	},
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
		// Block if unanswered questions
		if (answers.includes(null)) {
			alert("Please answer all questions before viewing report");
			return;
		}

		const totalScore = answers.reduce((sum, v) => sum + v, 0);
		const percentage = Math.round((totalScore / MAX_SCORE) * 100);

		let level = "Low Risk";
		if (percentage > 75) level = "High Risk";
		else if (percentage > 50) level = "Moderate Risk";
		else if (percentage > 25) level = "Mild Risk";

		const resultObj = { percentage, level };
		console.log("PCOS RESULT:", resultObj);

		setResult(resultObj);

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

	useEffect(() => {
		console.log("RESULT STATE UPDATED:", result);
	}, [result]);

	return (
		<div className="pcos-page premium-ui">
			{/* BACK */}
			<button className="back-btn" onClick={() => navigate("/health")}>
				← Dashboard
			</button>

			{/* HERO */}
			<div className="hero-section">
				<h1>PCOS Risk Check</h1>
				<p>
					Answer a few clinically inspired questions to understand your hormonal
					health better.
				</p>
			</div>

			{/* STEPPER */}
			<div className="stepper">
				<div className="step-track">
					<div
						className="step-fill"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
				<span>
					{answeredCount} of {questions.length} answered
				</span>
			</div>

			{/* QUESTIONS */}
			<div className="questions-wrapper">
				{questions.map((item, qIndex) => (
					<div className="pcos-question-card glass fade-up" key={qIndex}>
						<p className="question-number">Question {qIndex + 1}</p>
						<p className="question-text">{item.q}</p>

						<div className="options">
							{item.options.map((opt, i) => (
								<label className="option-pill premium" key={i}>
									<input
										type="radio"
										name={`q-${qIndex}`}
										onChange={() => handleSelect(qIndex, item.scores[i])}
									/>
									<span>{opt}</span>
								</label>
							))}
						</div>
					</div>
				))}
			</div>

			{/* CTA */}
			<button className="pcos-btn glow-btn" onClick={calculateRisk}>
				View My Health Report
			</button>

			{/* RESULT */}
			{result && (
				<>
					<div className="pcos-report glass result-animate">
						<h3>Your PCOS Risk Summary</h3>

						<div className="report-body">
							<div className="meter-container">
								<svg className="progress-ring" width="180" height="180">
									<circle className="ring-bg" cx="90" cy="90" r="75" />
									<circle
										className={`ring-progress ${result.level
											.replace(" ", "")
											.toLowerCase()}`}
										cx="90"
										cy="90"
										r="75"
										style={{
											strokeDashoffset:
												471 - (471 * result.percentage) / 100,
										}}
									/>
								</svg>

								<div className="meter-text">
									<h2>{result.percentage}%</h2>
									<p>{result.level}</p>
								</div>
							</div>

							<div className="report-note">
								<p>
									This score reflects your{" "}
									<strong>estimated PCOS risk</strong> based
									on symptoms commonly associated with hormonal imbalance.
								</p>
								<small>
									This is a screening tool, not a diagnosis. Always consult a
									healthcare professional.
								</small>
							</div>
						</div>
					</div>

					<div style={{ marginTop: "30px", textAlign: "center" }}>
						<button
							className="pcos-btn glow-btn"
							onClick={() =>
								navigate("/pcos/recommendations", {
									state: {
										percentage: result.percentage,
										level: result.level,
									},
								})
							}
						>
							See My Recommendations →
						</button>
					</div>

					{/* RECOMMENDATION PORTAL */}
					{result &&
						ReactDOM.createPortal(
							<div
								style={{
									position: "fixed",
									bottom: "24px",
									left: "50%",
									transform: "translateX(-50%)",
									zIndex: 100000,
								}}
							>
								<h2 style={{ color: "red", textAlign: "center" }}>
									PORTAL ACTIVE
								</h2>
								<button
									className="pcos-btn glow-btn"
									style={{
										padding: "16px 34px",
										fontSize: "1.1rem",
										borderRadius: "30px",
									}}
									onClick={() =>
										navigate("/pcos/recommendations", {
											state: {
												percentage: result.percentage,
												level: result.level,
											},
										})
									}
								>
									See My Recommendations →
								</button>
							</div>,
							document.body
						)}
				</>
			)}
		</div>
	);
}
