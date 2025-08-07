import StandingsSection from '../components/StandingsSection';
import TodayGames from '../components/TodayGames';
import '../css/HomePage.css';
function HomePage() {
  return (
    <div className="homepage">
      <TodayGames/>
      <div className="main-content">
        <div className="left-column">
          <StandingsSection />
        </div>
        <div className="middle-column">
          {/* Placeholder for now */}
        </div>
        <div className="right-column">
          {/* Placeholder for now */}
        </div>
      </div>
    </div>
    
  );
}
export default HomePage;
