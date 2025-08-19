import StandingsSection from '../components/StandingsSection';
import TodayGames from '../components/TodayGames';
import SearchBox from '../components/SearchBox';
import NewsSection from '../components/NewsSection';
import HomerunStanding from '../components/HomerunStanding';
import WinStanding from '../components/WinStanding';
import BattingAverageStanding from '../components/BattingAverageStanding';
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
            <SearchBox />
          </div>
          <div className="middle-down">
            <NewsSection/>
          </div>
        </div>

        <div className="right-column">
          <div className="right-up"><HomerunStanding/></div>
          <div className="right-middle"><WinStanding/></div>
          <div className="right-down"><BattingAverageStanding/></div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
