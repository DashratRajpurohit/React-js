import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isLiked, toggleLikeMeal } from "../utils/localStorage";
import Loading from "../components/Loading";

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          setMeal(data.meals[0]);
          setLiked(isLiked(data.meals[0].idMeal));
        } else {
          setError("Meal not found.");
        }
      } catch {
        setError("Failed to load meal details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const handleToggle = () => {
    toggleLikeMeal(meal.idMeal);
    setLiked(!liked);
  };

  const getIngredients = () => {
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
      </div>
    );
  if (!meal)
    return (
      <div className="page">
        <p className="error-msg">Meal not found.</p>
      </div>
    );

  const ingredients = getIngredients();

  return (
    <div className="page meal-details">
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
          </div>
          <button
            className={`btn btn-like btn-like-lg ${liked ? "liked" : ""}`}
            onClick={handleToggle}
          >
            {liked ? "♥ Unlike" : "♡ Like"}
          </button>
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
    </div>
  );
}
