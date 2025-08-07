import StandingsSection from '../components/StandingsSection';
import TodayGames from '../components/TodayGames';
import SearchBox from '../components/SearchBox';
import '../css/HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <TodayGames />
      <div className="main-content">
        <div className="left-column">
          <StandingsSection />
        </div>
        <div className="middle-column">
          <p className="search-text">Search & Follow Your Players</p>
          <SearchBox />
          {/* Placeholder for now */}
        </div>
        <div className="right-column">{/* Placeholder for now */}</div>
      </div>
    </div>
  );
}
export default HomePage;
