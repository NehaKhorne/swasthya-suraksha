import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSOS, setShowSOS] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastSOSRef = useRef(0);

  // ✅ Hero background from public folder
  const heroStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/pcos-hero-bg.png)`,
  };

  const sendSOS = () => {
    if (Date.now() - lastSOSRef.current < 10000) {
      alert("⚠️ Please wait 10 seconds before sending SOS again");
      return;
    }

    if (!navigator.geolocation) {
      alert("❌ Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const storedContacts =
            JSON.parse(localStorage.getItem("contacts")) || [];

          if (!storedContacts.length) {
            alert("❌ No emergency contacts found");
            setLoading(false);
            return;
          }

          const numbers = storedContacts.map((c) => {
            let phone = c.phone.trim();
            if (!phone.startsWith("+91")) {
              phone = `+91${phone}`;
            }
            return phone;
          });

          const response = await fetch(
            "http://localhost:5000/api/sos/send",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contacts: numbers,
                lat: latitude,
                lng: longitude,
              }),
            }
          );

          const data = await response.json();
          if (!response.ok)
            throw new Error(data.error || "SOS failed");

          lastSOSRef.current = Date.now();
          alert("🚨 SOS sent successfully!");
          setShowSOS(false);
        } catch (error) {
          alert("❌ SOS failed. Check backend.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("❌ Location permission denied");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="brand">
          <h2>Swasthya Suraksha</h2>
          <p>Women Health & Safety Platform</p>
        </div>

        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </header>

      {/* HERO */}
      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <h1>Your Safety. Your Health. Your Power.</h1>
          <p>
            Stay protected, manage trusted contacts, and track your
            health with smart safety technology.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="dashboard-grid">

        <div className="card sos-card">
          <img src="/images/sos-illustration.png" alt="SOS" />
          <h3>SOS Emergency</h3>
          <p>Instant alert with live location</p>
          <button
            className="sos-btn"
            onClick={() => setShowSOS(true)}
            disabled={loading}
          >
            SEND SOS
          </button>
        </div>

        <div className="card" onClick={() => navigate("/contacts")}>
          <img src="/images/contacts.png" alt="Contacts" />
          <h3>Emergency Contacts</h3>
          <p>Add and manage trusted people</p>
        </div>

        <div className="card" onClick={() => navigate("/health")}>
          <img src="/images/health.png" alt="Health" />
          <h3>Health Status</h3>
          <p>Track personal health insights</p>
        </div>

        <div className="card" onClick={() => navigate("/safety")}>
          <img src="/images/safety.png" alt="Safety" />
          <h3>Safety Awareness</h3>
          <p>Daily safety tips & alerts</p>
        </div>

      </section>

      {/* MODAL */}
      {showSOS && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Emergency Alert</h3>
            <p>Your live location will be shared immediately.</p>

            <div className="modal-actions">
              <button onClick={sendSOS} disabled={loading}>
                {loading ? "Sending..." : "Confirm SOS"}
              </button>

              <button
                className="cancel"
                onClick={() => setShowSOS(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
