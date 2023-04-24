import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import "./SideNavBar.css";

const SideNavBar = () => {
  const dropdownMenu = [
    { name: "Student Portal" },
    { name: "GitHub" },
    { name: "Figma" },
    { name: "VS Code" },
    { name: "Font Awesome" },
  ];
  const [selected, setSelected] = useState(dropdownMenu[0]);
  const [isExpanded, setExpandState] = useState(false);
  const menuItems = [
    // {
    // 	text: "Quick Links",
    // 	icon: "icons/quicklinks.svg",
    // },
    {
      text: "Discord",
      icon: "icons/discord.svg",
    },
    {
      text: "Newsletter",
      icon: "icons/newsletter.svg",
    },
    {
      text: "Announcements",
      icon: "icons/announcement.svg",
    },
    {
      text: "Events",
      icon: "icons/events.svg",
    },
    {
      text: "Videos",
      icon: "icons/videos.svg",
    },
    {
      text: "Canvas",
      icon: "icons/canvas.svg",
    },
    {
      text: "Settings",
      icon: "icons/settings.svg",
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
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img
                src="icons/btech3.png"
                alt="nav brand"
                style={{ height: 75, width: 85 }}
              />
              <h2>Web & Mobile Development</h2>
            </div>
          )}
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
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
            >
              Quick Links
            </Listbox.Button>
            <Listbox.Options>
              {dropdownMenu.map((link) => (
                <Listbox.Option
                  key={link.id}
                  value={link}
                  disabled={link.unavailable}
                >
                  <a href={link.href}>{link.name}</a>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          {menuItems.map(({ text, icon }) => (
            <a
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              href="#"
            >
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
              <p className="nav-footer-user-position">store admin</p>
            </div>
          </div>
        )}
        <img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
      </div>
    </div>
  );
};

export default SideNavBar;
