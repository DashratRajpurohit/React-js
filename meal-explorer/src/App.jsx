import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import MealDetails from "./pages/MealDetails";
import Categories from "./pages/Categories";
import CategoryMeals from "./pages/CategoryMeals";
import Areas from "./pages/Areas";
import AreaMeals from "./pages/AreaMeals";
import RandomMeal from "./pages/RandomMeal";
import Liked from "./pages/Liked";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:name" element={<CategoryMeals />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/area/:name" element={<AreaMeals />} />
          <Route path="/random" element={<RandomMeal />} />
          <Route path="/liked" element={<Liked />} />
        </Routes>
      </main>
    </div>
  );
}
