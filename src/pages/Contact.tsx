// src/pages/Contact.tsx

const Contact = () => {
	return (
		<div className="flex flex-col items-center justify-center text-[20px] text-center my-[140px] p-4">
			<h1 className="text-[26px] font-bold mb-4">Contact Us</h1>
			<div className="bg-[#773e0084] p-10 rounded-lg shadow-md w-full max-w-[600px]">
				<p className="mb-4">
					Have questions, comments, or feedback? We would love to hear from you!
				</p>
				<div className="mb-4">
					<h2 className="text-[22px] font-semibold">Email:</h2>
					<p>contact@recipefinder.com</p>
				</div>
				<div className="mb-4">
					<h2 className="text-[22px] font-semibold">Phone:</h2>
					<p>+1 (123) 456-7890</p>
				</div>
				<div className="mb-4">
					<h2 className="text-[22px] font-semibold">Address:</h2>
					<p>123 Recipe St, Food City, Yum 12345</p>
				</div>
				<div className="mb-4">
					<h2 className="text-[22px] font-semibold">Follow Us:</h2>
					<div className="flex justify-center space-x-4">
						<a
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer">
							<img
								src="/facebook-icon.png"
								alt="Facebook"
								className="w-8 h-8 hover:scale-110 transition-transform"
							/>
						</a>
						<a
							href="https://www.twitter.com"
							target="_blank"
							rel="noopener noreferrer">
							<img
								src="/twitter-icon.png"
								alt="Twitter"
								className="w-8 h-8 hover:scale-110 transition-transform"
							/>
						</a>
						<a
							href="https://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer">
							<img
								src="/instagram-icon.png"
								alt="Instagram"
								className="w-8 h-8 hover:scale-110 transition-transform"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
