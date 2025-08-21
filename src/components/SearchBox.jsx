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
    const player = await getPlayer(); // returns { people: [...] }

    // your desired IDs
    const selectedIds = [
      808982, // Jung Hoo Lee
      673490, // Ha-Seong Kim
      808975, // Hyeseong Kim
      808967, // Yoshinobu Yamamoto
      808963, // Roki Sasaki
      592450, // Aaron Judge (Yankees)
      660271, // Shohei Ohtani (Dodgers)
      660670, // Ronald Acuña Jr. (Braves)
      608369, // Paul Goldschmidt (Cardinals)
      547180, // Bryce Harper (Phillies)
      547989, // José Abreu (White Sox)
      518692, // Freddie Freeman (Dodgers)
      605141, // Mookie Betts (Dodgers)
      545361, // Mike Trout (Angels)
      608336, // Juan Soto (Yankees)
      664056, // Corey Seager (Rangers)
      663586, // Yordan Alvarez (Astros)
    ];

    // filter players by ID
    const selectedPlayers = player.people.filter(p =>
      selectedIds.includes(p.id)
    );

    setAllPlayers(player.people);
    setPlayers(selectedPlayers);
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
    console.log(player);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="search-box">
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
          <PlayerModal player={selectedPlayer} onClose={closeModal} />
        )}
      </div>
    </>
  );
}

export default SearchBox;
