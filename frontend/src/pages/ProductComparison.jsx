import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductComparison.css";

import whisper from "../assets/whisper.jpeg";
import stayfree from "../assets/stayfree.jpeg";
import sofy from "../assets/sofy.jpeg";
import paree from "../assets/paree.jpeg";
import carmesi from "../assets/carmesi.jpeg";
import nua from "../assets/nua.jpeg";
import sirona from "../assets/sirona.jpeg";
import sanfe from "../assets/sanfe.jpeg";
import saathi from "../assets/saathi.jpeg";
import plush from "../assets/plush.jpeg";
import peesafe from "../assets/peesafe.jpeg";
import niine from "../assets/niine.jpeg";
import evereve from "../assets/evereve.jpeg";

const PRODUCTS = [
  { name: "Whisper Ultra Soft XL", brand: "Whisper", eco: false, fragrance: true, budget: false, rating: 4.3, image: whisper, link: "https://www.amazon.in/s?k=Whisper+Ultra+Soft+XL" },
  { name: "Stayfree Secure Cottony XL", brand: "Stayfree", eco: false, fragrance: true, budget: true, rating: 4.1, image: stayfree, link: "https://www.amazon.in/s?k=Stayfree+Secure+Cottony+XL" },
  { name: "Sofy Antibacteria Extra Long", brand: "Sofy", eco: false, fragrance: true, budget: false, rating: 4.2, image: sofy, link: "https://www.amazon.in/s?k=Sofy+Antibacteria+Extra+Long" },
  { name: "Paree Super Soft Pads", brand: "Paree", eco: false, fragrance: true, budget: true, rating: 4.0, image: paree, link: "https://www.amazon.in/s?k=Paree+Super+Soft+Pads" },
  { name: "Carmesi Biodegradable Pads", brand: "Carmesi", eco: true, fragrance: false, budget: false, rating: 4.5, image: carmesi, link: "https://www.amazon.in/s?k=Carmesi+Biodegradable+Pads" },
  { name: "Nua Organic Cotton Pads", brand: "Nua", eco: true, fragrance: false, budget: false, rating: 4.4, image: nua, link: "https://www.amazon.in/s?k=Nua+Organic+Cotton+Pads" },
  { name: "Sirona Rash-Free Pads", brand: "Sirona", eco: true, fragrance: false, budget: false, rating: 4.3, image: sirona, link: "https://www.amazon.in/s?k=Sirona+Rash+Free+Pads" },
  { name: "Sanfe Organic Pads", brand: "Sanfe", eco: true, fragrance: false, budget: false, rating: 4.2, image: sanfe, link: "https://www.amazon.in/s?k=Sanfe+Organic+Pads" },
  { name: "Saathi Banana Fiber Pads", brand: "Saathi", eco: true, fragrance: false, budget: false, rating: 4.6, image: saathi, link: "https://www.amazon.in/s?k=Saathi+Banana+Fiber+Pads" },
  { name: "Plush Organic Pads", brand: "Plush", eco: true, fragrance: false, budget: false, rating: 4.6, image: plush, link: "https://www.amazon.in/s?k=Plush+Organic+Pads" },
  { name: "Pee Safe Ultra Thin Pads", brand: "Pee Safe", eco: false, fragrance: false, budget: false, rating: 4.1, image: peesafe, link: "https://www.amazon.in/s?k=Pee+Safe+Ultra+Thin+Pads" },
  { name: "NIINE Ultra Thin Pads", brand: "NIINE", eco: false, fragrance: true, budget: true, rating: 4.0, image: niine, link: "https://www.amazon.in/s?k=NIINE+Ultra+Thin+Pads" },
  { name: "Evereve Natural Pads", brand: "Evereve", eco: true, fragrance: false, budget: false, rating: 4.2, image: evereve, link: "https://www.amazon.in/s?k=Evereve+Natural+Pads" },
];

export default function ProductComparison() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const navigate = useNavigate();

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (product) => {
    setSelected(prev => {
      if (prev.find(p => p.name === product.name)) {
        return prev.filter(p => p.name !== product.name);
      }
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  };

  return (
    <div className="compare-page">

      <button className="back-btn" onClick={() => navigate("/health")}>
        ← Back
      </button>

      <h2 className="title"> Sanitary Pad Comparison</h2>

      <input
        className="search-input"
        placeholder="Search pads or brands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="product-grid">
        {filtered.map((p, i) => (
          <div key={i} className="product-card fade-in">

            <label className="select-box">
              <input
                type="checkbox"
                checked={selected.some(s => s.name === p.name)}
                onChange={() => toggleSelect(p)}
              />
              Compare
            </label>

            <img src={p.image} alt={p.name} />

            <h4>{p.name}</h4>
            <p>⭐ {p.rating}</p>

            <div className="card-buttons">
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                <button className="buy-btn">Buy on Amazon</button>
              </a>
            </div>

          </div>
        ))}
      </div>

      {selected.length >= 2 && (
        <div className="compare-bar slide-up">
          <span>{selected.length} products selected</span>
          <button onClick={() => setShowCompare(true)}>
            Compare Selected
          </button>
        </div>
      )}

      {showCompare && (
        <div className="compare-modal">
          <div className="compare-table-wrapper zoom-in">
            <h3>Product Comparison</h3>

            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {selected.map((p, i) => <th key={i}>{p.brand}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Eco-friendly</td>
                  {selected.map((p, i) => <td key={i}>{p.eco ? "✅" : "❌"}</td>)}
                </tr>
                <tr>
                  <td>Fragrance-free</td>
                  {selected.map((p, i) => <td key={i}>{!p.fragrance ? "✅" : "❌"}</td>)}
                </tr>
                <tr>
                  <td>Budget Friendly</td>
                  {selected.map((p, i) => <td key={i}>{p.budget ? "✅" : "❌"}</td>)}
                </tr>
                <tr>
                  <td>Rating</td>
                  {selected.map((p, i) => <td key={i}>{p.rating}</td>)}
                </tr>
              </tbody>
            </table>

            <button className="close-btn" onClick={() => setShowCompare(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
