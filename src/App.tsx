import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import RecipeList from "./components/RecipeList";
import SavedRecipes from "./pages/SavedRecipes";
import RecipeDetails from "./components/RecipeDetails";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast } from "react-toastify";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Profile from "./pages/Profile";

const REACT_APP_EDAMAM_API_ID = "4d4820cb";
const REACT_APP_EDAMAM_API_KEY = "e76db58840288ffb8ee1e0561bb2e585";

interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedRecipes");
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  const fetchRecipes = async (query: string, filter: string) => {
    try {
      const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
        params: {
          q: `${query} ${filter}`.trim(),
          app_id: REACT_APP_EDAMAM_API_ID,
          app_key: REACT_APP_EDAMAM_API_KEY,
          type: "public",
        },
      });
      const fetchedRecipes = response.data.hits.map((hit: any) => ({
        id: hit.recipe.uri.split("_")[1],
        title: hit.recipe.label,
        image: hit.recipe.image,
        ingredients: hit.recipe.ingredientLines,
      }));
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    fetchRecipes(query, filter);
  };

  const fetchRecommendedRecipes = async (filter: string = "") => {
    try {
      const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
        params: {
          q: filter || "popular",
          app_id: REACT_APP_EDAMAM_API_ID,
          app_key: REACT_APP_EDAMAM_API_KEY,
          type: "public",
        },
      });
      const fetchedRecipes = response.data.hits.map((hit: any) => ({
        id: hit.recipe.uri.split("_")[1],
        title: hit.recipe.label,
        image: hit.recipe.image,
        ingredients: hit.recipe.ingredientLines,
      }));
      setRecommendedRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecommendedRecipes();
  }, []);

  const saveRecipe = (recipe: Recipe) => {
    const updatedSavedRecipes = [...savedRecipes, recipe];
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
    toast.success("Recipe successfully saved");
  };

  const removeRecipe = (id: string) => {
    const updatedSavedRecipes = savedRecipes.filter((recipe) => recipe.id !== id);
    setSavedRecipes(updatedSavedRecipes);
    toast.success("Recipe successfully removed");
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    fetchRecipes(query, filter);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const handleLogin = (user: { email: string; password: string }) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.reload();
  };

  const filteredRecipes = filter
    ? recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(filter.toLowerCase())
          )
      )
    : recipes;

  return (
    <Router>
      <div className="min-h-screen bg-[#24170a] text-[#fff]">
        <Header
          onLogout={handleLogout}
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
        <LoginModal
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
        <SignupModal show={showSignupModal} onClose={() => setShowSignupModal(false)} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="flex items-center flex-wrap justify-between gap-4 pt-10">
                    <Search onSearch={handleSearch} />
                    <Filter onFilterChange={handleFilterChange} />
                  </div>
                  <div className="flex items-center flex-wrap gap-4">
                    {filteredRecipes.length > 0 ? (
                      <RecipeList recipes={filteredRecipes} saveRecipe={saveRecipe} />
                    ) : (
                      <RecipeList recipes={recommendedRecipes} saveRecipe={saveRecipe} />
                    )}
                  </div>
                </>
              }
            />
            <Route
              path="/saved"
              element={<SavedRecipes savedRecipes={savedRecipes} removeRecipe={removeRecipe} />}
            />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
