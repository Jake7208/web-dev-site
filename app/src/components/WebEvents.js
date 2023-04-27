import React from "react";
import useFetch from "../Hooks/useFetch";

const WebEvents = () => {
  const { data: posts, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/events/getAll`
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
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <p>{post.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WebEvents;
