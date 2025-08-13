import StandingsSection from '../components/StandingsSection';
import TodayGames from '../components/TodayGames';
import SearchBox from '../components/SearchBox';
import NewsSection from '../components/NewsSection';
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
          <div className="middle-up">
                  {/* <p className="search-text">Search & Follow Your Players</p>   SearchBox.jsx 안으로 옮기면 안되나?*/}
            <SearchBox />
          </div>
          <div className="middle-down">
            <NewsSection/>
          </div>
          
        </div>
        <div className="right-column">{/* Placeholder for now */}</div>
      </div>
    </div>
  );
}
export default HomePage;
