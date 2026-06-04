import "./Login.css";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero3-bg.png";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div
        className="background-layer"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      <div className="login-content">
        <div className="login-card">
          <h1>Swasthya Suraksha</h1>
          <p>Women Health & Safety Platform</p>

          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />

          <button onClick={() => navigate("/dashboard")}>
            Login
          </button>

          <span className="footer-text">
            Secure • Private • Reliable
          </span>
        </div>
      </div>
    </div>
  );
}
