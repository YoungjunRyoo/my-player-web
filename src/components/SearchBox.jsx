import React, { useState, useEffect } from 'react';
import { getPlayer } from '../services/mlbApi';
import SearchPlayer from './SearchPlayer';
import '../css/SearchBox.css';
import PlayerModal from './PlayerModal';

function SearchBox() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [tmpInput, setTmpInput] = useState('');

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const player = await getPlayer();
      setAllPlayers(player.people);
      setPlayers([
        player.people[595],
        player.people[894],
        player.people[288],
        player.people[1341],
        player.people[1199],
        player.people[465],
        player.people[627],
        player.people[112],
        player.people[1245],
        player.people[1353],
      ]);
    }
    fetchData();
  }, []);

  const buttonClick = (e) => {
    e.preventDefault();

    const searchedPlayer = allPlayers.filter((p) =>
      p.fullName.toLowerCase().includes(tmpInput.toLowerCase())
    );

    tmpInput.length !== 0 && setPlayers(searchedPlayer);

    const ohtaniIndex = allPlayers.findIndex((p) =>
      p.fullName.includes('Elly De La Cruz')
    );
    console.log(ohtaniIndex);
  };


  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };


  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <div className="search-header">
          <h2>Search & Follow Players</h2>
        </div>
        
        <form className="search">
          <input
            className="search-input"
            type="text"
            onChange={(e) => setTmpInput(e.target.value)}
            placeholder="Search Player"
          />
          <button className="search-btn" type="submit" onClick={buttonClick}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <div className="Searched-Player">
          {players.map((p) => (
            <div key={p.id} onClick={() => handlePlayerClick(p)}>
              <SearchPlayer
                id={p.id}
                firstName={p.firstName}
                lastName={p.lastName}
              />
            </div>
          ))}
        </div>


        {isModalOpen && (
          <PlayerModal player={selectedPlayer} onClose={closeModal}/>
        )}

      </div>
    </>
  );
}

export default SearchBox;
