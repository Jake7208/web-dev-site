import React from "react";
import classes from "./WebEvents.module.css";
import useFetch from "../Hooks/useFetch";

const WebEvents = () => {
	const { data: posts, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/events/getAll`,
	);

	if (!posts && !error) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (!Array.isArray(posts)) {
		return <p>Got: {posts.toString()}; expected Array.</p>;
	}

	return (
		<div>

		<h3 className={classes.events}>Web Events</h3>
		<div className={classes.news}>
			{posts.map((post) => {
				return (
					<div className={classes.columns} key={post.id}>
						<h2>{post.title}</h2>
						<p>{post.description}</p>
						<p>{post.date}</p>
					</div>
				);
			})}
			</div>
		</div>
	);
};

export default WebEvents;
