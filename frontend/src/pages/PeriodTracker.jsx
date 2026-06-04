import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PeriodTracker.css";
import illustration from "../assets/cycle-illustration.png";

export default function PeriodTracker() {
  const navigate = useNavigate();

  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleData, setCycleData] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());

  const today = new Date();

  /* ---------------- CALCULATE ---------------- */

  const calculateCycle = () => {
    if (!lastPeriod) return alert("Select last period date");

    const start = new Date(lastPeriod);
    const allPeriods = [];
    const fertileDays = [];
    const ovulations = [];

    // Predict 6 cycles ahead
    for (let c = 0; c < 6; c++) {
      const cycleStart = new Date(start);
      cycleStart.setDate(start.getDate() + cycleLength * c);

      // Period range
      for (let i = 0; i < periodLength; i++) {
        const d = new Date(cycleStart);
        d.setDate(cycleStart.getDate() + i);
        allPeriods.push(d.toDateString());
      }

      // Ovulation
      const ov = new Date(cycleStart);
      ov.setDate(cycleStart.getDate() + cycleLength - 14);
      ovulations.push(ov.toDateString());

      // Fertile window
      for (let i = -5; i <= 1; i++) {
        const d = new Date(ov);
        d.setDate(ov.getDate() + i);
        fertileDays.push(d.toDateString());
      }
    }

    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLength);

    setCycleData({
      allPeriods,
      fertileDays,
      ovulations,
      nextPeriod
    });
  };

  /* ---------------- PHASE ---------------- */

  const getCurrentPhase = () => {
    if (!cycleData) return "--";

    const todayStr = today.toDateString();

    if (cycleData.allPeriods.includes(todayStr))
      return "Menstrual Phase";
    if (cycleData.ovulations.includes(todayStr))
      return "Ovulation Phase";
    if (cycleData.fertileDays.includes(todayStr))
      return "Fertile Window";
    return "Luteal Phase";
  };

  const getMessage = () => {
    const phase = getCurrentPhase();

    switch (phase) {
      case "Menstrual Phase":
        return "You have entered your menstrual phase. Rest and gentle care matter most.";
      case "Fertile Window":
        return "You are in your fertile window. Energy and creativity may rise.";
      case "Ovulation Phase":
        return "Today is ovulation. Confidence and clarity peak naturally.";
      case "Luteal Phase":
        return "You are in luteal phase. Slow rhythms and balance are key.";
      default:
        return "";
    }
  };

  const getMonthDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) =>
      new Date(year, month, i + 1)
    );

    return [...blanks, ...days];
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="tracker-wrapper">

      <button onClick={() => navigate("/health")} className="back-btn">
        ← Back
      </button>

      <div className="top-section">

        <div className="image-section">
          <img src={illustration} alt="cycle" />
        </div>

        <div className="info-section">
          <h1>AI Cycle Tracker</h1>

          <div className="input-box">
            <input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(+e.target.value)}
              placeholder="Cycle Length"
            />
            <input
              type="number"
              value={periodLength}
              onChange={(e) => setPeriodLength(+e.target.value)}
              placeholder="Period Length"
            />
            <button onClick={calculateCycle}>Calculate</button>
          </div>

          {cycleData && (
            <div className="phase-card">
              <h2>{getCurrentPhase()}</h2>
              <p>{getMessage()}</p>

              <div className="dates">
                <div>
                  <strong>Next Period:</strong>{" "}
                  {cycleData.nextPeriod.toDateString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {cycleData && (
        <div className="calendar-card">

          <div className="calendar-header">
            <button onClick={() =>
              setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
            }>‹</button>

            <h3>
              {viewDate.toLocaleString("default", { month: "long" })}{" "}
              {viewDate.getFullYear()}
            </h3>

            <button onClick={() =>
              setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
            }>›</button>
          </div>

          <div className="weekdays">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {getMonthDays().map((day, i) => {
              if (!day) return <div key={i}></div>;

              const dayStr = day.toDateString();

              let cls = "day";

              if (cycleData.allPeriods.includes(dayStr))
                cls += " period";
              else if (cycleData.fertileDays.includes(dayStr))
                cls += " fertile";

              if (cycleData.ovulations.includes(dayStr))
                cls += " ovulation";

              return (
                <div key={i} className={cls}>
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
