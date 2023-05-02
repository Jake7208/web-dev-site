import React from "react";
import "./NewsLetter.css";
import useFetch from "../Hooks/useFetch";

const NewsLetter = () => {
  const { data: postURL, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/newsLetter/getLatest`
  );

  console.log(postURL, error);

  if (!postURL && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="newsletter">
      <div>
        <iframe src={postURL}></iframe>
      </div>
    </div>
  );
};

export default NewsLetter;
