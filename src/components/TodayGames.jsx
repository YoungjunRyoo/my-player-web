import React, { useState, useEffect } from 'react';
import ScoreBox from './ScoreBox';
import { getTodayGame } from '../services/mlbApi';
import '../css/ScoreBox.css';

const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const now = new Date();
const monthStr = monthNames[now.getMonth()];

const day = now.getDate() - 2;

function TodayGames() {
  const [todayGames, setTodayGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const todayGame = await getTodayGame();
      setTodayGames(todayGame.dates[0].games);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="loading">Loading games...</p>;
  }

  return (
    <div className="score-board">
      <p className="date">{`${monthStr} ${day}`}</p>
      <div className="matches">
        {todayGames.length > 0 ? (
          todayGames.map((g) => (
            <ScoreBox away={g.teams.away} home={g.teams.home} />
          ))
        ) : (
          <h3 className="title">No matches found for today</h3>
        )}
      </div>
    </div>
  );
}

export default TodayGames;
