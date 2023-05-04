import React from "react";
import classes from "./NewsLetter.module.css";
import useFetch from "../Hooks/useFetch";

const NewsLetter = () => {
  const { data: newslettersArray, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/newsLetter/getLatest`
  );

  console.log(newslettersArray, error);

  if (!newslettersArray && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={classes.newscontainer}>
      <h3 className={classes.newsletter}>Newsletter</h3>
      <div>
        <iframe src={newslettersArray[0].url} className={classes.news}></iframe>
        <p>{newslettersArray[0].title}</p>
      </div>
    </div>
  );
};

export default NewsLetter;
