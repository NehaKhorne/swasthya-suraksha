import "./education.css";
import img5 from "./05.png";
import img2 from "./02 (2).png";
import img4 from "./04.png";
import heroBg from "./edu-hero-bg.png";
import { useNavigate } from "react-router-dom";

export default function Education() {
  const navigate = useNavigate();

  return (
    <div className="pcos-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/health")}>
        ← Back
      </button>

      {/* HERO SECTION */}
      <header className="pcos-hero">
        <div
          className="pcos-hero-box"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="hero-content">
            <h1>Polycystic Ovary Syndrome (PCOS)</h1>
            <p>
              A complete educational resource explaining symptoms,causes, diagnosis, management, and prevention.
            </p>
          </div>
        </div>
      </header>

      {/* INFOGRAPHIC */}
      <section className="image-section">
        <img src={img4} alt="PCOS Overview Infographic" />
      </section>

      {/* QUICK FACTS */}
      <section className="facts">
        <h2>PCOS Affects 1 in 10 Women</h2>
        <div className="fact-grid">
          <div className="fact-card">
            <h3>10–15%</h3>
            <p>Women of reproductive age affected worldwide</p>
          </div>
          <div className="fact-card">
            <h3>50%</h3>
            <p>May develop insulin resistance</p>
          </div>
          <div className="fact-card">
            <h3>13.8 Million</h3>
            <p>Women affected in India</p>
          </div>
          <div className="fact-card">
            <h3>3x Risk</h3>
            <p>Higher risk of Type 2 Diabetes</p>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="content-section">
        <h2>Common Signs & Symptoms</h2>
        <div className="split-section">
          <img src={img2} alt="PCOS Symptoms" />
          <ul>
            <li>Irregular or missed periods</li>
            <li>Excess facial or body hair</li>
            <li>Acne and oily skin</li>
            <li>Weight gain</li>
            <li>Hair thinning</li>
            <li>Infertility</li>
            <li>Fatigue</li>
          </ul>
        </div>
      </section>

      {/* PHENOTYPES */}
      <section className="image-section">
        <h2>The 4 PCOS Phenotypes</h2>
        <img src={img5} alt="PCOS Phenotypes" />
      </section>

      {/* CAUSES */}
      <section className="content-section">
        <h2>Causes & Risk Factors</h2>
        <ul>
          <li>Hormonal imbalance (high androgen levels)</li>
          <li>Insulin resistance</li>
          <li>Genetic predisposition</li>
          <li>Chronic inflammation</li>
        </ul>
      </section>

      {/* DIAGNOSIS */}
      <section className="content-section">
        <h2>Diagnosis</h2>
        <p>Based on Rotterdam criteria – at least two of:</p>
        <ul>
          <li>Irregular ovulation</li>
          <li>High androgen levels</li>
          <li>Polycystic ovaries on ultrasound</li>
        </ul>
      </section>

      {/* VIDEOS */}
      <section className="videos">
        <h2>Educational Videos</h2>
        <div className="video-grid">
          <iframe src="https://www.youtube.com/embed/IvbjjJdKWTg" title="Video1" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/lgZ2dWdhlKY" title="Video2" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/RMWy9_CQZxc" title="Video3" allowFullScreen></iframe>
          <iframe src="https://www.youtube.com/embed/8ZlNU6NXyrk" title="Video4" allowFullScreen></iframe>
        </div>
      </section>

      {/* QUIZ */}
      <section className="quiz-section">
        <h2>Self-Assessment Quiz</h2>
        <a
          href="https://womenshealth.labcorp.com/polycystic-ovary-syndrome-pcos-quiz"
          target="_blank"
          rel="noopener noreferrer"
          className="quiz-btn"
        >
          Take PCOS Quiz
        </a>
      </section>

      {/* REFERENCES */}
      <section className="references">
        <h2>Trusted Medical Sources</h2>
        <ul>
          <li>
            <a
              href="https://my.clevelandclinic.org/health/diseases/8316-polycystic-ovary-syndrome-pcos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cleveland Clinic – PCOS Overview
            </a>
          </li>
          <li>WHO & NIH Women's Health Resources</li>
        </ul>
      </section>

    </div>
  );
}
