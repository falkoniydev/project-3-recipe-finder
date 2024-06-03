import React from "react";
import { Link } from "react-router-dom";

interface Recipe {
	id: string;
	title: string;
	image: string;
	ingredients: string[];
}

interface RecipeListProps {
	recipes: Recipe[];
	saveRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, saveRecipe }) => {
	return (
		<div className="flex justify-between gap-[30px] flex-wrap mb-10 ">
			{recipes.map((recipe) => (
				<div
					key={recipe.id}
					className="bg-[#773e0084] shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 w-[280px] flex flex-col justify-between gap-2">
					<img
						className="w-full h-48 object-cover mb-4 rounded-lg"
						src={recipe.image}
						alt={recipe.title}
					/>
					<h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
					<ul className="list-disc list-inside mb-4">
						{recipe.ingredients.slice(0, 2).map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
					<div className="flex justify-between">
						<button
							onClick={() => saveRecipe(recipe)}
							className=" text-white px-4 py-2 rounded-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-pink-500 hover:to-yellow-500">
							Save Recipe
						</button>
						<Link
							to={`/recipe/${recipe.id}`}
							className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
							View Details
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default RecipeList;
