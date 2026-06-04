import { useEffect, useState } from "react";
import { getDashboardPCOS } from "../services/pcosService";

export default function PCOSDashboardCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardPCOS().then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="pcos-card">
      <h3>PCOS Status</h3>
      <p>Risk: <b>{data.riskLevel}</b></p>
      <p>Score: {data.score}/100</p>
      <a href="/api/pcos/report">Download Report</a>
    </div>
  );
}
