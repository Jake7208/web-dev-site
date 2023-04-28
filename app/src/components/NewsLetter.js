import React from "react";
import "./NewsLetter.css";
import useFetch from "../Hooks/useFetch";

const NewsLetter = () => {
  const { data: posts, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/newsLetter/getAll`
  );

  // console.log(posts);

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
    <div className="newsletter">
      {posts.map((url, i) => {
        return (
          <div key={`key${i}`}>
            <p>{url}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NewsLetter;
