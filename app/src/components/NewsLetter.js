import React from "react";
import useFetch from "../Hooks/useFetch";

const NewsLetter = () => {
  const { data: posts, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/newsLetter/getNewsLetter`
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
    <div className="newsletter">
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.number}</h2>
            <p>{post.title}</p>
            <p>{post.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NewsLetter;
