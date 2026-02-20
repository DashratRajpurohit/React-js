import React, { createContext, useContext, useState } from "react";

const VegFilterContext = createContext();

// Non-veg categories from TheMealDB
const NON_VEG_CATEGORIES = [
  "Beef",
  "Chicken",
  "Lamb",
  "Pork",
  "Seafood",
  "Goat",
];

export function VegFilterProvider({ children }) {
  // "all" | "veg" | "nonveg"
  const [filter, setFilter] = useState("all");

  const filterMeals = (meals) => {
    if (!meals || filter === "all") return meals || [];
    if (filter === "veg") {
      return meals.filter(
        (m) => m.strCategory && !NON_VEG_CATEGORIES.includes(m.strCategory),
      );
    }
    // nonveg
    return meals.filter(
      (m) => m.strCategory && NON_VEG_CATEGORIES.includes(m.strCategory),
    );
  };

  const filterCategories = (categories) => {
    if (!categories || filter === "all") return categories || [];
    if (filter === "veg") {
      return categories.filter(
        (c) => !NON_VEG_CATEGORIES.includes(c.strCategory),
      );
    }
    return categories.filter((c) => NON_VEG_CATEGORIES.includes(c.strCategory));
  };

  return (
    <VegFilterContext.Provider
      value={{ filter, setFilter, filterMeals, filterCategories }}
    >
      {children}
    </VegFilterContext.Provider>
  );
}

export function useVegFilter() {
  return useContext(VegFilterContext);
}
