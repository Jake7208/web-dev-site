import React, { useState, useEffect } from "react";

import "./AnnouncementBanner.css";

const AnnouncementBanner = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(
      "https://test-vercel-56nw26r7g-jake7208.vercel.app/api/announcements/getAll"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  return (
    <div className="banner">
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div>
              <div>Delete</div>
            </div>
          </div>
        );
      })}
      <h1>Announcement Banner Goes Here</h1>
    </div>
  );
};

export default AnnouncementBanner;
// const AnnouncementBanner = () => {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     fetch(
//       "https://test-vercel-56nw26r7g-jake7208.vercel.app/api/announcements/getAll"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setPosts(data);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => {
//         return (
//           <div key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.body}</p>
//             <div>
//               <div>Delete</div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
