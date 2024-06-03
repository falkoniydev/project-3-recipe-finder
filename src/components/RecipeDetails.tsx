import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import VideoList from "./VideoList";

const REACT_APP_EDAMAM_API_ID = "4d4820cb";
const REACT_APP_EDAMAM_API_KEY = "e76db58840288ffb8ee1e0561bb2e585";
const REACT_APP_YOUTUBE_API_KEY = "AIzaSyDvNBF9xDD-6jW-jlwJbOAOGLwaJcwz-Rs";

interface Recipe {
	label: string;
	image: string;
	ingredientLines: string[];
	calories: number;
	totalNutrients: {
		[key: string]: {
			label: string;
			quantity: number;
			unit: string;
		};
	};
}

interface Video {
	id: string;
	title: string;
	url: string;
}

const RecipeDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [videos, setVideos] = useState<Video[]>([]);

	useEffect(() => {
		const fetchRecipeDetails = async () => {
			try {
				const response = await axios.get(
					`https://api.edamam.com/api/recipes/v2/${id}`,
					{
						params: {
							app_id: REACT_APP_EDAMAM_API_ID,
							app_key: REACT_APP_EDAMAM_API_KEY,
							type: "public",
						},
					}
				);
				setRecipe(response.data.recipe);
				fetchVideos(response.data.recipe.label);
			} catch (error) {
				console.error("Error fetching recipe details:", error);
			}
		};

		const fetchVideos = async (query: string) => {
			try {
				const response = await axios.get(
					`https://www.googleapis.com/youtube/v3/search`,
					{
						params: {
							part: "snippet",
							maxResults: 5,
							q: `${query} recipe`,
							key: REACT_APP_YOUTUBE_API_KEY,
						},
					}
				);
				const fetchedVideos = response.data.items
					.slice(0, 1)
					.map((item: any) => ({
						id: item.id.videoId,
						title: item.snippet.title,
						url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
					}));
				setVideos(fetchedVideos);
			} catch (error) {
				console.error("Error fetching videos:", error);
			}
		};

		fetchRecipeDetails();
	}, [id]);

	if (!recipe) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-[#773e0084] shadow-md rounded-lg p-10 my-[50px]">
			<h2 className="text-[36px] font-bold mb-4">{recipe.label}</h2>
			<div className="flex gap-4 justify-between">
				<div>
					<img
						className="w-[400px] h-[250px] object-cover mb-4"
						src={recipe.image}
						alt={recipe.label}
					/>

					<ul className="list-disc list-inside mb-4 w-[400px]">
						{recipe.ingredientLines.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
					<div>
						<h3 className="text-xl font-bold mb-2">Nutrition Facts</h3>
						<p>Calories: {recipe.calories}</p>
						<p>
							Protein: {recipe.totalNutrients.PROCNT.quantity}{" "}
							{recipe.totalNutrients.PROCNT.unit}
						</p>
						<p>
							Carbs: {recipe.totalNutrients.CHOCDF.quantity}{" "}
							{recipe.totalNutrients.CHOCDF.unit}
						</p>
						<p>
							Fat: {recipe.totalNutrients.FAT.quantity}{" "}
							{recipe.totalNutrients.FAT.unit}
						</p>
					</div>
				</div>
				<div>
					<VideoList videos={videos} />
				</div>
			</div>
		</div>
	);
};

export default RecipeDetails;
