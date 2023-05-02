import React from "react";
import classes from "./NewsLetter.module.css";
import useFetch from "../Hooks/useFetch";

const NewsLetter = () => {
	const { data: postURL, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/newsLetter/getLatest`,
	);

	console.log(postURL, error);

	if (!postURL && !error) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className={classes.newsletter}>
			<div>
				<iframe src={postURL} className={classes.news}></iframe>
			</div>
		</div>
	);
};

export default NewsLetter;
