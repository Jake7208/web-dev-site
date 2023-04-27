import SideNavBar from "./components/SideNavBar";
import AnnouncementBanner from "./components/AnnouncementBanner";
import "./App.css";
import NewsLetter from "./components/NewsLetter";
import SchoolCalendar from "./components/SchoolCalendar";

function App() {
  return (
    <div className="row">
      <SideNavBar />
      <AnnouncementBanner />
      <NewsLetter />
      <SchoolCalendar />
    </div>
  );
}

export default App;
