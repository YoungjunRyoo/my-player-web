import React, { useState, useEffect } from 'react';
import { getPlayer } from '../services/mlbApi';
import SearchPlayer from './SearchPlayer';
import '../css/SearchBox.css';

function SearchBox() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      const player = await getPlayer();
      setAllPlayers(player.people);
    }
    fetchData();
  }, []);

  useEffect(() => {
    searchInput.length > 2 &&
      setPlayers(
        allPlayers.filter((p) =>
          p.fullName.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
  }, [searchInput]);

  console.log(players);
  return (
    <>
      <div>
        <div className="search">
          <input
            className="search-input"
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          ></input>
        </div>
        <div className="Searched-Player">
          {players.map((p) => (
            <SearchPlayer
              id={p.id}
              firstName={p.firstName}
              lastName={p.lastName}
            />
          ))}
        </div>

        <div className="searchResult"></div>
      </div>
    </>
  );
}

export default SearchBox;
