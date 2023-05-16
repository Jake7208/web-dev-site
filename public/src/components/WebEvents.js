import React from "react";
import classes from "./WebEvents.module.css";
import useFetch from "../Hooks/useFetch";

import EventCard from "./EventCard";

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
			<div className={[classes.main, classes.center].join(" ")}>
				{posts.map((post) => {
					return <EventCard post={post} />;
				})}
			</div>
		</div>
	);
};

export default WebEvents;
