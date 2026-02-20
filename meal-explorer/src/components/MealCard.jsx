import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isLiked, toggleLikeMeal } from "../utils/localStorage";

export default function MealCard({ meal }) {
  const [liked, setLiked] = useState(isLiked(meal.idMeal));

  const handleToggle = () => {
    toggleLikeMeal(meal.idMeal);
    setLiked(!liked);
  };

  return (
    <div className="meal-card">
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
            className={`btn btn-like ${liked ? "liked" : ""}`}
            onClick={handleToggle}
          >
            {liked ? "♥ Unlike" : "♡ Like"}
          </button>
          <Link to={`/meal/${meal.idMeal}`} className="btn btn-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
