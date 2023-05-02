import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import "./SideNavBar.css";
import { BiLink, BiNews } from "react-icons/bi";
import { FiVideo } from "react-icons/fi";
import { GiLockedFortress } from "react-icons/gi";

const SideNavBar = () => {
	const dropdownMenu = [
		{ name: "Student Portal" },
		{ name: "Canvas" },
		{ name: "Discord" },
		{ name: "GitHub" },
		{ name: "Figma" },
		{ name: "VS Code" },
		{ name: "Font Awesome" },
	];
	const [selected, setSelected] = useState(dropdownMenu[0]);
	const [isExpanded, setExpandState] = useState(false);
	const menuItems = [
		{
			text: "Newsletter",
			//icon: "../../public/icons/article.png",
			icon: <BiNews />,
		},
		{
			text: "Videos",
			//icon: "../../public/icons/video.png",
			icon: <FiVideo />,
		},
	];
	return (
		<div
			className={
				isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"
			}
		>
			<div className="side-nav-box">
				<div className="nav-upper">
					<div className="nav-heading">
						<div className="nav-brand">
							<h2>Web & Mobile Development</h2>
							<img src="icons/btech3.png" alt="nav brand" />
						</div>

						<button
							className={
								isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
							}
							onClick={() => setExpandState(!isExpanded)}
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
					<div className="nav-menu">
						<Listbox value={selected} onChange={setSelected}>
							<Listbox.Button
								className={isExpanded ? "menu-item-ql" : "menu-item-ql menu-item-NX-ql"}
							>
								<p>Quick Links</p>
								<BiLink className="link-icon" />
							</Listbox.Button>
							<Listbox.Options className="dropdown-options-container">
								{dropdownMenu.map((link, i) => (
									<Listbox.Option
										className="dropdown-options"
										key={link.id + i}
										value={link}
										disabled={link.unavailable}
									>
										<a href={link.href}>{link.name}</a>
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Listbox>
						{menuItems.map((link, i) => (
							<a
								key={`key-${i}`}
								className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
								href="#"
							>
								<p>{link.text}</p>
								{link.icon}
							</a>
						))}
					</div>
				</div>
				<div className="nav-footer">
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcSet=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">UserName</p>
							<p className="nav-footer-user-position">Admin Login</p>
						</div>{" "}
						<Link to="/AdminPage">
							<GiLockedFortress className="logout-icon" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;
