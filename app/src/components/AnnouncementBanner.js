<<<<<<< HEAD
import React, { useEffect, useState } from "react";

const AnnouncementBanner = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(
      "https://test-vercel-56nw26r7g-jake7208.vercel.app/api/announcements/getAll"
    );
  });
  return (
    <div>
      {posts.map((post) => {
        return <div className="post-card" key={post.id}></div>;
      })}
    </div>
  );
=======
import React from "react";
import "./AnnouncementBanner.css";

const AnnouncementBanner = () => {
	return (
		<div className="banner">
			<h1>Announcement Banner Goes Here</h1>
		</div>
	);
>>>>>>> 9461a776113fa8024e8a00f09af913229f32db60
};

export default AnnouncementBanner;
