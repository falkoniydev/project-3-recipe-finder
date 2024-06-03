import React from "react";
import { Link } from "react-router-dom";

interface Recipe {
	id: string;
	title: string;
	image: string;
	ingredients: string[];
}

interface SavedRecipesProps {
	savedRecipes: Recipe[];
	removeRecipe: (id: string) => void;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({
	savedRecipes,
	removeRecipe,
}) => {
	return (
		<div>
			<h2 className="text-[36px] font-bold my-5">Saved Recipes</h2>
			{savedRecipes.length === 0 ? (
				<p className="flex items-center justify-center text-[26px] text-center my-[140px]">
					No saved recipes yet.
				</p>
			) : (
				<div className=" flex gap-[20px] flex-wrap items-center justify-between p-5">
					{savedRecipes.map((recipe) => (
						<div
							key={recipe.id}
							className="bg-[#773e0084] w-[260px] h-[300px] flex flex-col justify-between shadow-md rounded-lg p-4 mb-4 transform transition duration-300 hover:scale-105 ">
							<img
								className="w-full h-48 object-cover mb-4 rounded-lg"
								src={recipe.image}
								alt={recipe.title}
							/>
							<h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
							<div>
								<button
									onClick={() => removeRecipe(recipe.id)}
									className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
									Remove Recipe
								</button>
								<Link
									to={`/recipe/${recipe.id}`}
									className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
									View Details
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SavedRecipes;
