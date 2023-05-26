import React, { useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import SideNavBar from "../components/SideNavBar";
import classes from "./ViewVideos.module.css";

const ViewVideos = () => {
	const { data: videoURLs, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/videos/getAll`,
	);

	console.log(videoURLs, error);

	//Annimate on scroll not working???
	// useEffect(() => {
	// 	const boxes = document.querySelectorAll(".box");
	// 	window.addEventListener("scroll", () => {
	// 		const triggerBottom = (window.innerHeight / 5) * 4;
	// 		boxes.forEach((box) => {
	// 			const boxTop = box.getBoundingClientRect().top;
	// 			if (boxTop < triggerBottom) {
	// 				box.classList.add("show");
	// 			} else {
	// 				box.classList.remove("show");
	// 			}
	// 		});
	// 	});
	// }, []);

	if (!videoURLs && !error) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className={classes.page} onScroll>
			<SideNavBar />
			<div className={classes.container}>
				<div className={classes.responsive}>
					{videoURLs.map((v) => (
						<>
							<h1>{v.title}</h1>
							<div className={classes.box}>
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
							</div>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default ViewVideos;
