import React from "react";
import SideNavBar from "../components/SideNavBar";

const AdminPage = () => {
  return (
    <div className="container">
      <SideNavBar />
      <div className="Tabs">
        {/* Tab nav */}
        <ul className="nav">
          <li>Tab 1</li>
          <li>Tab 2</li>
        </ul>
        <div className="outlet">{/* content will be shown here */}</div>
      </div>
      <h1 className="admin">..............AdminPage..........</h1>
    </div>
  );
};

export default AdminPage;
