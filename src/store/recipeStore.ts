import { create } from "zustand";
import { toast } from "react-toastify";

interface Recipe {
	id: string;
	title: string;
	image: string;
	ingredients: string[];
}

interface RecipeStore {
	recipes: Recipe[];
	savedRecipes: Recipe[];
	recommendedRecipes: Recipe[];
	filter: string;
	query: string;
	setRecipes: (recipes: Recipe[]) => void;
	setSavedRecipes: (recipes: Recipe[]) => void;
	setRecommendedRecipes: (recipes: Recipe[]) => void;
	setFilter: (filter: string) => void;
	setQuery: (query: string) => void;
	saveRecipe: (recipe: Recipe) => void;
	removeRecipe: (id: string) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
	recipes: [],
	savedRecipes: [],
	recommendedRecipes: [],
	filter: "",
	query: "",
	setRecipes: (recipes) => set({ recipes }),
	setSavedRecipes: (savedRecipes) => set({ savedRecipes }),
	setRecommendedRecipes: (recommendedRecipes) => set({ recommendedRecipes }),
	setFilter: (filter) => set({ filter }),
	setQuery: (query) => set({ query }),
	saveRecipe: (recipe) =>
		set((state) => {
			const updatedSavedRecipes = [...state.savedRecipes, recipe];
			localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
			toast.success("Recipe successfully saved");
			return { savedRecipes: updatedSavedRecipes };
		}),
	removeRecipe: (id) =>
		set((state) => {
			const updatedSavedRecipes = state.savedRecipes.filter(
				(recipe) => recipe.id !== id
			);
			localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
			toast.success("Recipe successfully removed");
			return { savedRecipes: updatedSavedRecipes };
		}),
}));
