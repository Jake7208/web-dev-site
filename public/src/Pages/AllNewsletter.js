import React from "react";
import useFetch from "../Hooks/useFetch";

import SideNavBar from "../components/SideNavBar";
import classes from "./AllNewsletter.module.css";

/* array: [
  {
    title: "...",
    url: "..."
  },
  {
    title: "...",
    url: "..."
  },
  {
    title: "...",
    url: "..."
  },
  {
    title: "...",
    url: "..."
  },
  {
    title: "...",
    url: "..."
  }
]
*/

const AllNewsletter = () => {
	const { data: allnewsletterArray, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/newsLetter/getAll?page=1`,
	);

	console.log(allnewsletterArray, error);

	if (!allnewsletterArray && !error) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className={classes.outerBox}>
			<SideNavBar />
			<div className={classes.container}>
				<h3>Newsletter Archive</h3>
				<div>
					{allnewsletterArray.map((newsletter) => {
						console.log(newsletter);
						return <a href={newsletter.url}>{newsletter.title}</a>;
					})}
				</div>
			</div>
		</div>
	);
};

export default AllNewsletter;
