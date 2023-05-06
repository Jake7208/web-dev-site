import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Listbox } from "@headlessui/react";

import { BiLink, BiNews } from "react-icons/bi";
import { FiVideo } from "react-icons/fi";
import { GiLockedFortress } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { CgFigma } from "react-icons/cg";
import { SiVisualstudiocode } from "react-icons/si";

import "./SideNavBar.css";

const SideNavBar = () => {
  const dropdownMenu = [
    { name: "Student Portal", icon: <ImBooks className="submenu-icon" /> },
    { name: "Canvas", icon: <FaRegUser className="submenu-icon" /> },
    { name: "Discord", icon: <BsDiscord className="submenu-icon" /> },
    { name: "GitHub", icon: <BsGithub className="submenu-icon" /> },
    { name: "Figma", icon: <CgFigma className="submenu-icon" /> },
    { name: "VS Code", icon: <SiVisualstudiocode className="submenu-icon" /> },
  ];
  const [selected, setSelected] = useState(dropdownMenu[0]);
  const [isExpanded, setExpandState] = useState(false);
  const menuItems = [
    {
      text: "Newsletter",
      //icon: "../../public/icons/article.png",
      icon: <BiNews className="menu-item-icon" />,
      path: "/AllNewsletter",
    },
    {
      text: "Videos",
      //icon: "../../public/icons/video.png",
      icon: <FiVideo className="menu-item-icon" />,
      path: "/ViewVideos",
    },
  ];
  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="side-nav-box">
        <div className="nav-upper">
          <div className="nav-heading">
            <div className="nav-brand">
              <h2>Web & Mobile Development</h2>
              <Link to="/">
                <img src="icons/btech3.png" alt="nav brand" />
              </Link>
            </div>

            <button
              className={
                isExpanded
                  ? "hamburger hamburger-in"
                  : "hamburger hamburger-out"
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
                className={
                  isExpanded ? "menu-item-ql" : "menu-item-ql menu-item-NX-ql"
                }
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
                    {link.icon}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            {menuItems.map((link, i) => (
              <Link
                key={`key-${i}`}
                className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
                to={link.path}
              >
                <p>{link.text}</p>
                {link.icon}
              </Link>
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
