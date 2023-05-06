import React from "react";
import useFetch from "../Hooks/useFetch";
import SideNavBar from "../components/SideNavBar";
import "./viewvideos.css";

const ViewVideos = () => {
  const { data: videoURLs, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/videos/getAll`
  );

  console.log(videoURLs, error);

  if (!videoURLs && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      <SideNavBar />
      <h3>...........Videos</h3>
      <div>
        {videoURLs.map((v) => (
          <>
            <p>{v.title}</p>
            <iframe
              width="560"
              height="315"
              src={v.link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </>
        ))}
      </div>
    </div>
  );
};

export default ViewVideos;
