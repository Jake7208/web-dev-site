import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import "./SideNavBar.css";
import { BiLink, BiNews } from "react-icons/bi";
import { FiVideo } from "react-icons/fi";

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
			icon: <BiNews />,
		},
		{
			text: "Videos",
			icon: <FiVideo />,
		},
	];
	return (
		<div
			className={
				isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/btech3.png" alt="nav brand" />
							<h2>Web & Mobile Development</h2>
						</div>
					)}
					<button
						className={isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"}
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
							className={isExpanded ? "menu-item-ql" : "menu-item menu-item-NX"}
						>
							Quick Links
						</Listbox.Button>
						<Listbox.Options>
							{dropdownMenu.map((link) => (
								<Listbox.Option key={link.id} value={link} disabled={link.unavailable}>
									<a href={link.href}>{link.name}</a>
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Listbox>

					{menuItems.map(({ text, icon }) => (
						<a className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} href="#">
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							{isExpanded && <p>{text}</p>}
						</a>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">UserName</p>
							<p className="nav-footer-user-position">Admin Login</p>
						</div>
					</div>
				)}
				<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
			</div>
		</div>
	);
};

export default SideNavBar;
