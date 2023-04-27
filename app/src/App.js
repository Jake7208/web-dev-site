import SideNavBar from "./components/SideNavBar";
import AnnouncementBanner from "./components/AnnouncementBanner";
import "./App.css";
import NewsLetter from "./components/NewsLetter";

function App() {
  return (
    <div className="row">
      <SideNavBar />
      <AnnouncementBanner />
      <NewsLetter />
    </div>
  );
}

export default App;
