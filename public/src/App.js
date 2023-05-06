import SideNavBar from "./components/SideNavBar";
import AnnouncementBanner from "./components/AnnouncementBanner";
import "./App.css";
import NewsLetter from "./components/NewsLetter";
import SchoolCalendar from "./components/SchoolCalendar";
import WebEvents from "./components/WebEvents";

function App() {
	return (
		<div>
			<SideNavBar />
			<div className="row">
				<AnnouncementBanner />
				<NewsLetter />
				<SchoolCalendar />
				<WebEvents />
			</div>
		</div>
	);
}

export default App;
