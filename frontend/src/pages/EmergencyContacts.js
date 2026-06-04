import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Contacts.css";
import SafetyHero from "../assets/safety-hero.png";
import WhatsAppQR from "../assets/whatsapp-qr.png";

export default function EmergencyContacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(saved);
  }, []);

  const saveContacts = (updated) => {
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  const addContact = () => {
    if (!name || !phone) return alert("Please fill all fields");

    const newContact = {
      id: Date.now(),
      name,
      phone,
    };

    saveContacts([...contacts, newContact]);
    setName("");
    setPhone("");
  };

  const deleteContact = (id) => {
    saveContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="contacts-page">
      <div className="contacts-wrapper">

        {/* Header */}
        <div className="contacts-header">
          <img src={SafetyHero} alt="Safety" />
          <h2>Emergency Contacts</h2>
          <p>Add trusted people for instant SOS alerts</p>
        </div>

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        {/* WhatsApp SOS Section */}
        <div className="whatsapp-card">
          <h3>📲 WhatsApp SOS</h3>
          <button
            className="whatsapp-btn"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? "Hide QR" : "Enable WhatsApp Alerts"}
          </button>

          {showQR && (
            <div className="qr-container">
              <img src={WhatsAppQR} alt="WhatsApp QR" />
              <p>Scan QR → Open WhatsApp → Send <b>join</b></p>
            </div>
          )}
        </div>

        {/* Add Contact */}
        <div className="add-contact-card">
          <input
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={addContact}>+ Add Contact</button>
        </div>

        {/* Contact List */}
        <div className="contacts-list">
          {contacts.length === 0 ? (
            <div className="empty-state">
              <p>No emergency contacts added yet.</p>
            </div>
          ) : (
            contacts.map((c) => (
              <div className="contact-card" key={c.id}>
                <div>
                  <strong>{c.name}</strong>
                  <p>{c.phone}</p>
                </div>
                <div className="actions">
                  
                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
