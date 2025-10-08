// client/src/App.js
import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ totalArea: "", bedrooms: "", bathrooms: "" });
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLayout(null);
    try {
      const res = await fetch("http://localhost:5000/api/layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalArea: parseInt(form.totalArea),
          bedrooms: parseInt(form.bedrooms),
          bathrooms: parseInt(form.bathrooms),
        }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setLayout(data.layout);
    } catch (err) {
      setError("Failed to fetch layout");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>AI House Layout Generator (Rule-Based MVP)</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Total Area (sq ft):
          <input type="number" name="totalArea" value={form.totalArea} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Bedrooms:
          <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Bathrooms:
          <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Generate Layout</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {layout && (
        <svg width={400} height={300} style={{ border: "1px solid #ccc", marginTop: 20 }}>
          {layout.map((room, i) => (
            <g key={i}>
              <rect
                x={room.x * 10}
                y={room.y * 10}
                width={room.width * 10}
                height={room.height * 10}
                fill="#90cdf4"
                stroke="#2c5282"
                strokeWidth={2}
              />
              <text
                x={room.x * 10 + 10}
                y={room.y * 10 + 20}
                fill="#2c5282"
                fontSize={12}
                fontWeight="bold"
              >
                {room.name}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
