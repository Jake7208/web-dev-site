import React from "react";
import useFetch from "../Hooks/useFetch";
import SideNavBar from "../components/SideNavBar";
import classes from "./viewvideos.module.css";

const ViewVideos = () => {
	const { data: videoURLs, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/videos/getAll`,
	);

	console.log(videoURLs, error);

	if (!videoURLs && !error) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className={classes.page}>
			<SideNavBar />
			<div className={classes.container}>
				<div>
					{videoURLs.map((v) => (
						<>
							<h1>{v.title}</h1>
							<iframe
								width="560"
								height="315"
								src={v.link}
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
								className={classes.videoLight}
							></iframe>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default ViewVideos;
