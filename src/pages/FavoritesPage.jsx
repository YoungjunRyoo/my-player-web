import TodayGames from "../components/TodayGames";
import { getFavoritePlayers } from "../services/firestore";
import SearchPlayer from "../components/SearchPlayer";
import { useState, useEffect } from "react";


function FavoritesPage() {
   const [favoritePlayers, setFavoritePlayers] = useState([]);

   useEffect(() => {

    const fetchFavorites = async () => {
      try {
        const players = await getFavoritePlayers(); 
        
        if (players) {
          setFavoritePlayers(players);
        } else {
          setFavoritePlayers([]); 
        }
      } catch (e) {

        console.error(e);
      } 
    };

    fetchFavorites();
  }, []); 


  return (
    <div>
      <TodayGames />
      <div>
        {favoritePlayers.map((p) => (
      <SearchPlayer
                id={p.id}
                firstName={p.firstName}
                lastName={p.lastName}
              />
        ))}
        {console.log(getFavoritePlayers())}
      </div>
    </div>
  );
}
export default FavoritesPage;
