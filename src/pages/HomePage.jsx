import StandingsSection from '../components/StandingsSection';
import TodayGames from '../components/TodayGames';

function HomePage() {
  return (
    <>
      <div>
        <TodayGames />
      </div>
      <div className="home-page">
        <StandingsSection />
      </div>
    </>
  );
}
export default HomePage;
