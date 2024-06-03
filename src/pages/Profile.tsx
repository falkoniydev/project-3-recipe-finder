import React from "react";

const Profile: React.FC = () => {
	const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

	if (!user) {
		return (
			<div className="flex items-center justify-center text-[26px] text-center my-[140px]">
				<p>Please log in to view your profile.</p>
			</div>
		);
	}
 
	console.log(user);

	return (
		<div className="flex items-center justify-center text-[26px] text-center my-[140px]">
			<div className="flex flex-col gap-5 justify-center items-center">
				<img
					src="/profile-pic-big.png"
					alt=""
					className="w-[100px] h-[100px] "
				/>
				<h2 className="text-3xl font-bold mb-4">Profile Info</h2>
				<p>
					<strong>Email:</strong> <span className="italic">{user.email}</span>
				</p>
				<p>
					<strong>Password:</strong>{" "}
					<span className="italic">{user.password}</span>
				</p>
			</div>
		</div>
	);
};

export default Profile;
