import React, { useState, useEffect } from "react";

import "./AnnouncementBanner.css";
import useFetch from "../Hooks/useFetch";

const AnnouncementBanner = () => {
  const { data: posts, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/announcements/getAll`
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
