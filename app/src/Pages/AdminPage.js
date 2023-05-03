import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import AnnouncementTab from "./AllTabs/AnnouncementTab";
import EventTab from "./AllTabs/EventTab";
import ResourceTab from "./AllTabs/ResourceTab";
import VideoTab from "./AllTabs/VideoTab";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="container">
      <SideNavBar />
      <div className="Tabs">
        {/* Tab nav */}
        <ul className="nav">
          <li className={activeTab === "tab1" ? "active" : ""}>
            ANNOUNCEMENTS
          </li>
          <li className={activeTab === "tab2" ? "active" : ""}>EVENTS</li>
          <li className={activeTab === "tab3" ? "active" : ""}>RESOURCE</li>
          <li className={activeTab === "tab4" ? "active" : ""}>VIDEOS</li>
        </ul>
        <div className="outlet">{/* content will be shown here */}</div>
      </div>
    </div>
  );
};

export default AdminPage;
