import React, { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import AnnouncementTab from "./AllTabs/AnnouncementTab";
import EventTab from "./AllTabs/EventTab";
import ResourceTab from "./AllTabs/ResourceTab";
import VideoTab from "./AllTabs/VideoTab";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import "./AdminPage.css";
import useFetch from "../Hooks/useFetch";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /*
    data: {
      events: [{
        title: string,
        description: string,
        date: string
      }],
      announcements: [{
        title: string,
        description: string,
        date: string
      }],
      videos: [{
        title: string,
        url: string
      }],
      resources: [{
        title: string,
        description: string
      }],
    }

  */
  const { data, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/newsLetter/adminGetAll`
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handleLogin = (event) => {
    event.preventDefault();
    // Add authentication login here
    if (username === "admin" && password === "password") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  if (isLoading && !error) {
    // style it a bit more
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to grab backend data!</p>;
  }

  if (!isAuthorized) {
    // login form goes here
    return (
      <div className="container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }

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
            <AnnouncementTab data={data.announcements} />
          </TabContent>
          <TabContent id="tab2" activeTab={activeTab}>
            <EventTab />
          </TabContent>
          <TabContent id="tab3" activeTab={activeTab}>
            <ResourceTab />
          </TabContent>
          <TabContent id="tab4" activeTab={activeTab}>
            <VideoTab />
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
