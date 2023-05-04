import React from "react";
import useFetch from "../Hooks/useFetch";

const ViewVideos = () => {
  const { data: postURL, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/videos/getAll`
  );

  console.log(postURL, error);

  if (!postURL && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h3>Videos</h3>
      <div>
        <iframe src={postURL}></iframe>
      </div>
    </div>
  );
};

export default ViewVideos;
