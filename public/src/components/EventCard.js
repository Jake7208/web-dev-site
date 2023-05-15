import React, { useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { MdUnfoldMoreDouble } from "react-icons/md";

import classes from "./EventCard.module.css";

const EventCard = ({ post }) => {
	const [detailActive, setDetailActive] = useState(false);

	return (
		<div className={[classes.box, classes.center].join(" ")}>
			<div>
				<p className={classes.name}>{post.title}</p>
			</div>
			<div className={[classes.arrow, classes.center].join(" ")}>
				<FaArrowRight className={classes.fas} onClick={() => setDetailActive(true)} />
			</div>
			<div
				className={
					detailActive
						? [classes.leftContainer, classes.active].join(" ")
						: [classes.leftContainer, classes.off].join(" ")
				}
			>
				<div className={classes.details}>
					<div className={classes.description}>{post.description}</div>
					<div className={classes.date}>{post.date}</div>
				</div>
				<div className={classes.more}>
					<MdUnfoldMoreDouble className={classes.tilt} />
					<p>More Info...</p>
				</div>
				<div className={[classes.cancel, classes.center].join(" ")}>
					<FaTimes className={classes.fas} onClick={() => setDetailActive(false)} />
				</div>
			</div>
		</div>
	);
};

export default EventCard;
