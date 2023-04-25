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
};

export default AnnouncementBanner;
