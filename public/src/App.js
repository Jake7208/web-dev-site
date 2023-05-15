import SideNavBar from "./components/SideNavBar";
import AnnouncementBanner from "./components/AnnouncementBanner";
import "./App.css";
import NewsLetter from "./components/NewsLetter";
import SchoolCalendar from "./components/SchoolCalendar";
import WebEvents from "./components/WebEvents";
import ComeJoinUs from "./components/ComeJoinUs";

function App() {
	return (
		<div className="home">
			<SideNavBar />
			<div className="row">
				<AnnouncementBanner />
				<NewsLetter />
				<ComeJoinUs />
				<SchoolCalendar />
				<WebEvents />
			</div>
		</div>
	);
}

export default App;
