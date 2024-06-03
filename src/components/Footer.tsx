// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="bg-[#773e0084] py-10 text-white">
			<div className="container mx-auto flex max-sm:flex-col max-sm:gap-10 justify-between items-center">
				<div>
					<Link
						to="/"
						className="text-white hover:text-yellow-300 transition duration-300 mr-4">
						Home
					</Link>
					<Link
						to="/saved"
						className="text-white hover:text-yellow-300 transition duration-300 mr-4">
						Saved Recipes
					</Link>
					<Link
						to="/about"
						className="text-white hover:text-yellow-300 transition duration-300 mr-4">
						About Us
					</Link>
					<Link
						to="/contact"
						className="text-white hover:text-yellow-300 transition duration-300 mr-4">
						Contact Us
					</Link>
				</div>
				<div>
					&copy; 2024 Recipe Finder. Shahboz Nabiyev. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
