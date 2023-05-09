import React from "react";
import { Link } from "react-router-dom";

import classes from "./ComeJoinUs.module.css";

const ComeJoinUs = () => {
	return (
		<div className={classes.callTo}>
			<Link className={classes.action} to="https://btech.edu/web-mobile-development/">
				Want to learn more? <br />
				Come Join Us!
			</Link>
		</div>
	);
};

export default ComeJoinUs;
