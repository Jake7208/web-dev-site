import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import AnnouncementTab from "./AllTabs/AnnouncementTab";
import EventTab from "./AllTabs/EventTab";
import ResourceTab from "./AllTabs/ResourceTab";
import VideoTab from "./AllTabs/VideoTab";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="container">
      <SideNavBar />
      <div className="Tabs">
        <ul className="nav">
          <TabNavItem
            title="Announcements"
            id="tab1"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title="Events"
            id="tab2"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title="Resources"
            id="tab3"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title="Videos"
            id="tab4"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ul>

        <div className="outlet">
          <TabContent id="tab1" activeTab={activeTab}>
            <p>You can do all your announcements changes here!</p>
          </TabContent>
          <TabContent id="tab2" activeTab={activeTab}>
            <p>You can add all the web and mobile party events here 🎉!!</p>
          </TabContent>
          <TabContent id="tab3" activeTab={activeTab}>
            <p>Resources and links....</p>
          </TabContent>
          <TabContent id="tab4" activeTab={activeTab}>
            <p>Your YT videos!</p>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
