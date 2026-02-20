import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useVegFilter } from "../context/VegFilterContext";
import { getLikedMeals, toggleLikeMeal } from "../utils/localStorage";

export default function Liked() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { filterMeals } = useVegFilter();

  const fetchLikedMeals = async () => {
    const ids = getLikedMeals();
    if (ids.length === 0) {
      setMeals([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const promises = ids.map((id) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => res.json())
          .then((data) => (data.meals ? data.meals[0] : null)),
      );
      const results = await Promise.all(promises);
      setMeals(results.filter(Boolean));
    } catch {
      setError("Failed to load liked meals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedMeals();
  }, []);

  const handleRemove = (id) => {
    toggleLikeMeal(id);
    setMeals((prev) => prev.filter((m) => m.idMeal !== id));
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="page">
        <p className="error-msg">{error}</p>
      </div>
    );

  const filteredMeals = filterMeals(meals);

  return (
    <div className="page">
      <h1 className="page-title">♥ Liked Meals</h1>
      {meals.length === 0 ? (
        <p className="empty-msg">No liked meals yet.</p>
      ) : (
        <div className="meals-grid">
          {filteredMeals.length === 0 ? (
            <p className="empty-msg">
              No liked meals match your filter selection.
            </p>
          ) : (
            filteredMeals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-card-img"
                />
                <div className="meal-card-body">
                  <h3 className="meal-card-title">{meal.strMeal}</h3>
                  <span className="meal-card-category">{meal.strCategory}</span>
                  <div className="meal-card-actions">
                    <button
                      className="btn btn-like liked"
                      onClick={() => handleRemove(meal.idMeal)}
                    >
                      ✕ Remove
                    </button>
                    <Link
                      to={`/meal/${meal.idMeal}`}
                      className="btn btn-details"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
