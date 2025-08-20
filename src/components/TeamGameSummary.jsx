import { useEffect, useState } from 'react';
import { fetchTeamGameSummaries } from '../services/mlbApi';
import '../css/TeamGameSummary.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit',
  });
}

function GameRow({ game, teamId }) {
  const isHome = game.teams.home.team.id === teamId;
  const opponent = isHome ? game.teams.away.team : game.teams.home.team;
  const teamScore = isHome ? game.teams.home.score : game.teams.away.score;
  const oppScore = isHome ? game.teams.away.score : game.teams.home.score;
  const isFinal = game.status.abstractGameState === 'Final';

  return (
    <div className="game-row">
      <div className="game-team">
        <img src={`https://www.mlbstatic.com/team-logos/${opponent.id}.svg`} alt={opponent.name} />
        <span>{opponent.name}</span>
      </div>
      <div className="game-info">
        <div>{formatDate(game.gameDate)}</div>
        {isFinal ? (
          <>
            <div className="score">{teamScore} - {oppScore}</div>
            <div>Final</div>
          </>
        ) : (
          <>
            <div>{formatTime(game.gameDate)}</div>
            <div>@ {game.venue.name}</div>
          </>
        )}
      </div>
    </div>
  );
}

function TeamGameSummary({ teamId }) {
  const [combinedGames, setCombinedGames] = useState([]);

  useEffect(() => {
    async function load() {
      const { pastGames, futureGames } = await fetchTeamGameSummaries(teamId);
      const merged = [...futureGames, ...pastGames].sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));
      setCombinedGames(merged);
    }
    if (teamId) load();
  }, [teamId]);

  return (
    <div className="team-game-summary">
      <div className="game-section">
        <h3>Team Schedule</h3>
        {combinedGames.length > 0 ? (
          combinedGames.map(game => (
            <GameRow key={game.gamePk} game={game} teamId={teamId} />
          ))
        ) : (
          <p>No schedule available.</p>
        )}
      </div>
    </div>
  );
}

export default TeamGameSummary;
