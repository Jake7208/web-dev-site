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
  const [errorMsg, setErrorMsg] = useState(undefined);
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
  const { data, error, status } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/getAdminEverything/getAll`
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }

    console.log(data, error, status);
  }, [data, error, status]);

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          // password good n stuff
          if (data.status === "fail") {
            // no login
            setErrorMsg(data.data);
          } else {
            // good login
          }
          console.log(data);
        });
      })
      .catch(() => {
        console.log("oh no! 2");
      });

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

  if (status === 401) {
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
          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    );
  }

  if (error) {
    return <p>Failed to grab backend data!</p>;
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
