import { useEffect, useState } from "react";
import { getDoctorSummary } from "../services/pcosService";

export default function DoctorSummary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDoctorSummary().then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div>
      <h2>Doctor Ready PCOS Summary</h2>
      <p><b>Risk:</b> {data.riskLevel}</p>
      <p><b>Score:</b> {data.score}</p>

      <h4>Symptoms</h4>
      <ul>
        {Object.keys(data.answers).map(
          k => data.answers[k] && <li key={k}>{k}</li>
        )}
      </ul>

      <button onClick={() => window.print()}>Print</button>
    </div>
  );
}
