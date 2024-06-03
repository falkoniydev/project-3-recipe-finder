import React from "react";

interface Video {
	id: string;
	title: string;
	url: string;
}

interface VideoListProps {
	videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
	return (
		<div className="">
			{videos.length === 0 ? (
				<p>No videos found.</p>
			) : (
				videos.map((video) => (
					<div key={video.id} className="mb-4">
						<iframe
							className="w-[750px] h-[500px]"
							src={`https://www.youtube.com/embed/${video.id}`}
							title={video.title}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
						<h3 className="text-2xl font-semibold mt-10">{video.title}</h3>
					</div>
				))
			)}
		</div>
	);
};

export default VideoList;
