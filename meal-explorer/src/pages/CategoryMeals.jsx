import MealCard from "../components/MealCard";
import Loading from "../components/Loading";
import { useVegFilter } from "../context/VegFilterContext";

export default function CategoryMeals() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { filterMeals } = useVegFilter();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
        );
        const data = await res.json();
        const filtered = data.meals || [];

        // filter endpoint only returns id, name, thumb — fetch full data for category
        if (filtered.length > 0) {
          const fullMeals = await Promise.all(
            filtered.slice(0, 20).map(async (m) => {
              const r = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`,
              );
              const d = await r.json();
              return d.meals ? d.meals[0] : null;
            }),
          );
          setMeals(fullMeals.filter(Boolean));
        } else {
          setMeals([]);
        }
      } catch {
        setError("Failed to load meals for this category.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [name]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="page">
        <p className="error-msg">{error}</p>
      </div>
    );

  return (
    <div className="page">
      <Link to="/categories" className="back-link">
        ← Back to Categories
      </Link>
      <h1 className="page-title">🍴 {name} Meals</h1>
      {meals.length === 0 ? (
        <p className="empty-msg">No meals found in this category.</p>
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
