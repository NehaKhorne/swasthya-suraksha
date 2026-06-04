import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useNavigate } from "react-router-dom";

/* ================================================= */
/* 🔥 HEATMAP LAYER */
/* ================================================= */
function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data.length) return;

    const heatPoints = data.map(c => [c.lat, c.lng, c.count]);

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 35,
      blur: 25,
      maxZoom: 17,
    });

    heatLayer.addTo(map);

    return () => map.removeLayer(heatLayer);
  }, [data, map]);

  return null;
}

/* ================================================= */
/* 🌍 HAVERSINE DISTANCE */
/* ================================================= */
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/* ================================================= */
/* 🚀 MAIN COMPONENT */
/* ================================================= */
export default function SafetyMap() {

  const navigate = useNavigate();

  const [crimeData, setCrimeData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [safetyScore, setSafetyScore] = useState(100);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [nearbyCrimes, setNearbyCrimes] = useState([]);
  const [nearestStation, setNearestStation] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const alertSound = useRef(new Audio("/alert.mp3"));
  const alertPlayed = useRef(false);

  const [reportData, setReportData] = useState({
    area: "",
    type: "",
    description: ""
  });

  /* ================= FETCH CRIMES ================= */
  useEffect(() => {
    axios.get("http://localhost:5000/api/crimes")
      .then(res => setCrimeData(res.data))
      .catch(err => console.log(err));
  }, []);

  /* ================= USER LOCATION ================= */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => console.log("Location denied")
    );
  }, []);

  /* ================= FILTER ================= */
  const filteredCrimes =
    filter === "All"
      ? crimeData
      : crimeData.filter(c => c.type === "Kidnapping");

  /* ================= SAFETY LOGIC ================= */
  useEffect(() => {
    if (!userLocation || !filteredCrimes.length) return;

    let score = 100;
    let nearby = [];

    filteredCrimes.forEach(crime => {
      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        crime.lat,
        crime.lng
      );

      if (distance < 1) {
        nearby.push(crime.type);

        if (crime.zoneColor === "red") score -= 30;
        else if (crime.zoneColor === "orange") score -= 15;
        else score -= 5;
      }
    });

    const hour = new Date().getHours();
    if (hour >= 20 || hour <= 5) score -= 15;

    if (score < 0) score = 0;

    const risk =
      score >= 80 ? "Low" :
      score >= 60 ? "Moderate" :
      score >= 40 ? "High" :
      "Extreme";

    setSafetyScore(score);
    setRiskLevel(risk);
    setNearbyCrimes([...new Set(nearby)]);

    if (score < 60 && !alertPlayed.current) {
      alertSound.current.play();
      alertPlayed.current = true;
    }

    axios.get("http://localhost:5000/api/crimes/police", {
      params: {
        lat: userLocation.lat,
        lng: userLocation.lng
      }
    })
    .then(res => setNearestStation(res.data))
    .catch(() => setNearestStation(null));

  }, [userLocation, filteredCrimes]);

  /* ================================================= */
  /* 🎨 UI DESIGN */
  /* ================================================= */
  return (
    <div style={styles.page}>

      {/* BACK BUTTON */}
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>Women Safety Intelligence Dashboard</h1>
        <p>Real-time AI-based location safety analysis</p>
      </div>

      {/* CONTROL BAR */}
      <div style={styles.controlBar}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Crimes</option>
          <option value="Kidnapping">Kidnapping Only</option>
        </select>
      </div>

      {/* SAFETY CARD */}
      <div style={{
        ...styles.safetyCard,
        borderColor:
          riskLevel === "Low" ? "#22c55e" :
          riskLevel === "Moderate" ? "#facc15" :
          riskLevel === "High" ? "#f97316" :
          "#ef4444"
      }}>
        <h2>Safety Score: {safetyScore}/100</h2>
        <span style={styles.riskBadge}>{riskLevel}</span>
      </div>

      {/* POLICE CARD */}
      {nearestStation && (
        <div style={styles.policeCard}>
          🚔 <strong>{nearestStation.station}</strong>
          <div>📞 {nearestStation.contact}</div>
        </div>
      )}

      {/* MAP */}
      <div style={styles.mapContainer}>
        <MapContainer
          center={[19.0760, 72.8777]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <HeatmapLayer data={filteredCrimes} />

          {filteredCrimes.map((crime, i) => (
            <CircleMarker
              key={i}
              center={[crime.lat, crime.lng]}
              radius={7}
              color={crime.zoneColor}
            >
              <Popup>
                <strong>{crime.area}</strong><br />
                {crime.type}<br />
                Cases: {crime.count}
              </Popup>
            </CircleMarker>
          ))}

          {userLocation && (
            <CircleMarker
              center={[userLocation.lat, userLocation.lng]}
              radius={10}
              color="#2563eb"
            >
              <Popup>You are here</Popup>
            </CircleMarker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

/* ================================================= */
/* 🎨 STYLES */
/* ================================================= */
const styles = {
  page: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    minHeight: "100vh",
    padding: "30px",
    color: "white",
    fontFamily: "sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "20px"
  },
  backBtn: {
    background: "#2563eb",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px"
  },
  controlBar: {
    marginBottom: "20px"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },
  safetyCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    border: "2px solid",
    backdropFilter: "blur(10px)"
  },
  riskBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    background: "#ef4444",
    fontWeight: "bold"
  },
  policeCard: {
    background: "#facc15",
    color: "#111",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  mapContainer: {
    height: "550px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
  }
};
