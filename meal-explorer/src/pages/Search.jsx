import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealCard from "../components/MealCard";
import Loading from "../components/Loading";
import { useVegFilter } from "../context/VegFilterContext";

export default function Search() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { filterMeals } = useVegFilter();

  const fetchMeals = async (url) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch {
      setError("Failed to fetch meals. Please try again.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.trim()}`,
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="page">
      <h1 className="page-title">🔍 Search Meals</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a meal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-search">
          Search
        </button>
        <Link to="/random" className="btn btn-random">
          🎲 Random
        </Link>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {meals.length === 0 && !error ? (
        <p className="empty-msg">No meals found. Try a different search!</p>
      ) : (
        <div className="meals-grid">
          {filterMeals(meals).length === 0 ? (
            <p className="empty-msg">No meals match your filter selection.</p>
          ) : (
            filterMeals(meals).map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
