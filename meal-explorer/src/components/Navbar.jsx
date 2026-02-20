import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getLikedMeals } from "../utils/localStorage";
import { useVegFilter } from "../context/VegFilterContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [likedCount, setLikedCount] = useState(getLikedMeals().length);
  const { filter, setFilter } = useVegFilter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const update = () => setLikedCount(getLikedMeals().length);
    window.addEventListener("likedMealsUpdated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("likedMealsUpdated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">🍽️ Meal Explorer</div>

      <div className="navbar-controls">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="veg-filter">
          <button
            className={`filter-btn ${filter === "all" ? "filter-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn filter-veg ${filter === "veg" ? "filter-active" : ""}`}
            onClick={() => setFilter("veg")}
          >
            🥦 Veg
          </button>
          <button
            className={`filter-btn filter-nonveg ${filter === "nonveg" ? "filter-active" : ""}`}
            onClick={() => setFilter("nonveg")}
          >
            🍖 Non-Veg
          </button>
        </div>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Search
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/areas"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Cuisines
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/random"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🎲 Random
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/liked"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Liked
            {likedCount > 0 && <span className="badge">{likedCount}</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
