import React, { useState, useEffect } from "react";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";
import { RiRadioButtonLine } from "react-icons/ri";

import classes from "./AnnouncementBanner.module.css";
import useFetch from "../Hooks/useFetch";

const AnnouncementBanner = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const { data: posts, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/announcements/getAll`,
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

	const updateIndex = (newIndex) => {
		if (newIndex < 0) {
			newIndex = posts.length - 1;
		} else if (newIndex >= posts.length) {
			newIndex = 0;
		}

		setActiveIndex(newIndex);
	};

	return (
		<div>
			<div className={classes.banner}>
				<h3 className={classes.announcements}>Announcements</h3>
				<div className={classes.carousel}>
					<div
						className={classes.inner}
						style={{ transform: `translate(-${activeIndex * 100}%)` }}
					>
						{posts.map((post) => {
							return (
								<div key={post.id} className={classes.carouselItem}>
									<h2>{post.title}</h2>
									<p>{post.description}</p>
									<p>{post.date}</p>
								</div>
							);
						})}
					</div>
					<div className={classes.cButtons}>
						<button
							onClick={() => {
								updateIndex(activeIndex - 1);
							}}
							className={classes.arrow}
						>
							<TbArrowBigLeftLines />
						</button>
						<div className={classes.indicators}>
							{posts.map((item, index) => {
								return (
									<button
										onClick={() => {
											updateIndex(index);
										}}
										className={classes.iButtons}
									>
										<RiRadioButtonLine
											className={`${
												index === activeIndex
													? [classes.indicatorSymbolActive]
													: [classes.indicatorSymbol]
											}`}
										/>
									</button>
								);
							})}
						</div>
						<button
							onClick={() => {
								updateIndex(activeIndex + 1);
							}}
							className={classes.arrow}
						>
							<TbArrowBigRightLines />
						</button>
					</div>
				</div>
			</div>
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
