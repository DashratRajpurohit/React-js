import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useVegFilter } from "../context/VegFilterContext";
import Loading from "../components/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { filterCategories } = useVegFilter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php",
        );
        const data = await res.json();
        setCategories(data.categories || []);
      } catch {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="page">
        <p className="error-msg">{error}</p>
      </div>
    );

  return (
    <div className="page">
      <h1 className="page-title">📂 Categories</h1>
      <div className="categories-grid">
        {filterCategories(categories).length === 0 ? (
          <p className="empty-msg">
            No categories match your filter selection.
          </p>
        ) : (
          filterCategories(categories).map((cat) => (
            <Link
              key={cat.idCategory}
              to={`/category/${cat.strCategory}`}
              className="category-card"
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="category-img"
              />
              <div className="category-body">
                <h3 className="category-name">{cat.strCategory}</h3>
                <p className="category-desc">
                  {cat.strCategoryDescription
                    ? cat.strCategoryDescription.substring(0, 100) + "..."
                    : "No description available."}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
