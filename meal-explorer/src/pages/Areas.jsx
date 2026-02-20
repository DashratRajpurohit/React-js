import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
        );
        const data = await res.json();
        setAreas(data.meals || []);
      } catch {
        setError("Failed to load areas.");
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="page">
        <p className="error-msg">{error}</p>
      </div>
    );

  const areaFlags = {
    American: "🇺🇸",
    British: "🇬🇧",
    Canadian: "🇨🇦",
    Chinese: "🇨🇳",
    Croatian: "🇭🇷",
    Dutch: "🇳🇱",
    Egyptian: "🇪🇬",
    Filipino: "🇵🇭",
    French: "🇫🇷",
    Greek: "🇬🇷",
    Indian: "🇮🇳",
    Irish: "🇮🇪",
    Italian: "🇮🇹",
    Jamaican: "🇯🇲",
    Japanese: "🇯🇵",
    Kenyan: "🇰🇪",
    Malaysian: "🇲🇾",
    Mexican: "🇲🇽",
    Moroccan: "🇲🇦",
    Polish: "🇵🇱",
    Portuguese: "🇵🇹",
    Russian: "🇷🇺",
    Spanish: "🇪🇸",
    Thai: "🇹🇭",
    Tunisian: "🇹🇳",
    Turkish: "🇹🇷",
    Vietnamese: "🇻🇳",
    Unknown: "🌍",
  };

  return (
    <div className="page">
      <h1 className="page-title">🌍 Cuisines by Area</h1>
      <div className="areas-grid">
        {areas.map((area) => (
          <Link
            key={area.strArea}
            to={`/area/${area.strArea}`}
            className="area-card"
          >
            <span className="area-flag">{areaFlags[area.strArea] || "🍽️"}</span>
            <span className="area-name">{area.strArea}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
