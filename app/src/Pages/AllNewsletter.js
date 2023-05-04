import React from "react";
import useFetch from "../Hooks/useFetch";
import SideNavBar from "../components/SideNavBar";
import "./allnewsletter.css";

const AllNewsletter = () => {
  const { data: postURL, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/newsLetter/getAll`
  );

  console.log(postURL, error);

  if (!postURL && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      <SideNavBar />
      <h3>AllNewsletter</h3>
      <div>
        <iframe src={postURL}></iframe>
      </div>
    </div>
  );
};

export default AllNewsletter;
