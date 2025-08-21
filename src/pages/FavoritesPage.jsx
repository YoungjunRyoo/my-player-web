import TodayGames from '../components/TodayGames';
import { getFavoritePlayers } from '../services/firestore';
import SearchPlayer from '../components/SearchPlayer';
import { useLoginContext } from '../contexts/LoginContext';
import FavoritePlayer from '../components/FavoritePlayer.jsx';
import '../css/FavoritePlayer.css';

function FavoritesPage() {
  const { favoritePlayers } = useLoginContext();

  return (
    <div>
      <TodayGames />
      <div className="favorite">
        {favoritePlayers.map((p) => (
          <FavoritePlayer id={p.id} />
        ))}
        {/* {console.log(getFavoritePlayers())} */}
      </div>
    </div>
  );
}
export default FavoritesPage;
