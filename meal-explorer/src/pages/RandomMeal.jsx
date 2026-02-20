import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { isLiked, toggleLikeMeal } from "../utils/localStorage";
import Loading from "../components/Loading";

export default function RandomMeal() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");

  const fetchRandom = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php",
      );
      const data = await res.json();
      if (data.meals && data.meals[0]) {
        setMeal(data.meals[0]);
        setLiked(isLiked(data.meals[0].idMeal));
      } else {
        setError("Could not load a random meal.");
      }
    } catch {
      setError("Failed to fetch random meal.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  const handleToggle = () => {
    if (!meal) return;
    toggleLikeMeal(meal.idMeal);
    setLiked(!liked);
  };

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(
          `${measure ? measure.trim() : ""} ${ingredient.trim()}`,
        );
      }
    }
    return ingredients;
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="page">
        <p className="error-msg">{error}</p>
        <button
          className="btn btn-search"
          onClick={fetchRandom}
          style={{ marginTop: "1rem" }}
        >
          Try Again
        </button>
      </div>
    );
  if (!meal)
    return (
      <div className="page">
        <p className="error-msg">No meal found.</p>
      </div>
    );

  const ingredients = getIngredients();

  return (
    <div className="page random-meal-page">
      <div className="random-header">
        <h1 className="page-title">🎲 Random Meal</h1>
        <button className="btn btn-search" onClick={fetchRandom}>
          🔄 Get Another
        </button>
      </div>

      <div className="meal-details-header">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meal-details-img"
        />
        <div className="meal-details-info">
          <h1>{meal.strMeal}</h1>
          <div className="meal-details-tags">
            <span className="tag">📂 {meal.strCategory}</span>
            <span className="tag">🌍 {meal.strArea}</span>
            {meal.strTags && <span className="tag">🏷️ {meal.strTags}</span>}
          </div>
          <div className="random-actions">
            <button
              className={`btn btn-like btn-like-lg ${liked ? "liked" : ""}`}
              onClick={handleToggle}
            >
              {liked ? "♥ Unlike" : "♡ Like"}
            </button>
            <Link
              to={`/meal/${meal.idMeal}`}
              className="btn btn-details btn-like-lg"
            >
              Full Details
            </Link>
          </div>
        </div>
      </div>

      <div className="meal-details-body">
        <div className="meal-section">
          <h2>📝 Instructions</h2>
          <p className="meal-instructions">{meal.strInstructions}</p>
        </div>
        <div className="meal-section">
          <h2>🧂 Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, idx) => (
              <li key={idx} className="ingredient-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {meal.strYoutube && (
        <div className="meal-section" style={{ marginTop: "2rem" }}>
          <h2>🎬 Video</h2>
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
              title={meal.strMeal}
              allowFullScreen
              className="meal-video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
