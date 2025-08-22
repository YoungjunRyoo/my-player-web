// src/components/PlayerModal.jsx
import { useEffect, useState } from 'react';
import '../css/PlayerModal.css';
import {
  getPlayerHittingStats,
  getPlayerPitchingStats,
  getPlayerLast3PitchingGames,
  getPlayerLast3HittingGames,
} from '../services/mlbApi';
import HittingStats from './HittingStats';
import PitchingStats from './PitchingStats';
import Last3HittingGames from './Last3HittingGames';
import Last3PitchingGames from './Last3PitchingGames';
import { useLoginContext } from '../contexts/LoginContext';

const TEAM_NAME_MAP = {
  108: 'Los Angeles Angels',
  109: 'Arizona Diamondbacks',
  110: 'Baltimore Orioles',
  111: 'Boston Red Sox',
  112: 'Chicago Cubs',
  113: 'Cincinnati Reds',
  114: 'Cleveland Guardians',
  115: 'Colorado Rockies',
  116: 'Detroit Tigers',
  117: 'Houston Astros',
  118: 'Kansas City Royals',
  119: 'Los Angeles Dodgers',
  120: 'Washington Nationals',
  121: 'New York Mets',
  133: 'Oakland Athletics',
  134: 'Pittsburgh Pirates',
  135: 'San Diego Padres',
  136: 'Seattle Mariners',
  137: 'San Francisco Giants',
  138: 'St. Louis Cardinals',
  139: 'Tampa Bay Rays',
  140: 'Texas Rangers',
  141: 'Toronto Blue Jays',
  142: 'Minnesota Twins',
  143: 'Philadelphia Phillies',
  144: 'Atlanta Braves',
  145: 'Chicago White Sox',
  146: 'Miami Marlins',
  147: 'New York Yankees',
  158: 'Milwaukee Brewers',
};

function PlayerModal({ player, onClose }) {
  const [hittingStats, setHittingStats] = useState(null);
  const [pitchingStats, setPitchingStats] = useState(null);
  const [last3Hitting, setLast3Hitting] = useState([]);
  const [last3Pitching, setLast3Pitching] = useState([]);
  const { favoritePlayers, addPlayerInFavorites, deletePlayerInFavorites } =
    useLoginContext();

  const handleFollowClick = (e) => {
    e.stopPropagation();
    addPlayerInFavorites(player);
  };

  const handleFollowingClick = (e) => {
    e.stopPropagation();
    deletePlayerInFavorites(player.id);
  };

  const isFollowing = favoritePlayers.some((p) => p.id === player.id);

  useEffect(() => {
    if (!player) return;

    const fetchStats = async () => {
      const isPitcher = player.primaryPosition?.type === 'Pitcher';
      const isHitter = player.primaryPosition?.type === 'Position Player';
      const isTwoWay = !isPitcher && !isHitter;

      if (isPitcher || isTwoWay) {
        const pitching = await getPlayerPitchingStats(player.id);
        const pitchingGames = await getPlayerLast3PitchingGames(player.id);
        setPitchingStats(pitching);
        setLast3Pitching(pitchingGames);
      }

      if (isHitter || isTwoWay) {
        const hitting = await getPlayerHittingStats(player.id);
        const hittingGames = await getPlayerLast3HittingGames(player.id);
        setHittingStats(hitting);
        setLast3Hitting(hittingGames);
      }
    };

    fetchStats();
  }, [player]);

  if (!player) return null;

  return (
    <div className="modal-overlay">
      <div className="player-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <img
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.id}/headshot/67/current.png`}
            alt={player.fullName}
            className="player-img"
          />
          <div className="player-info">
            <h1>
              <img
                src={`https://www.mlbstatic.com/team-logos/${player.currentTeam.id}.svg`}
                alt={player.currentTeam.name}
                className="team-logo-small"
              />{' '}
              {player.fullName} #{player.primaryNumber || 'N/A'}{' '}
            </h1>
            <hr className="player-divider" />
            <p>
              <strong>Team:</strong>{' '}
              {TEAM_NAME_MAP[player.currentTeam?.id] || 'N/A'}
            </p>
            <p>
              <strong>Born:</strong> {player.birthDate} in {player.birthCity},{' '}
              {player.birthStateProvince}, {player.birthCountry}{' '}
            </p>
            <p>
              <strong>MLB Debut:</strong> {player.mlbDebutDate}
            </p>
            <p>
              <strong>Height / Weight:</strong> {player.height} /{' '}
              {player.weight}lbs
            </p>
            <p>
              <strong>Position:</strong> {player.primaryPosition?.name}
            </p>
            <p>
              <strong>Throws / Bats:</strong> {player.pitchHand?.description} /{' '}
              {player.batSide?.description}
            </p>
            {isFollowing ? (
              <div className="following" onClick={handleFollowingClick}>
                <p className="following-text">Following</p>
              </div>
            ) : (
              <div className="follow" onClick={handleFollowClick}>
                <p className="follow-text">Follow</p>
              </div>
            )}
            {/* <hr className="player-divider" /> */}
          </div>
        </div>

        {hittingStats && hittingStats.length > 0 && (
          <>
            <Last3HittingGames games={last3Hitting} />
          </>
        )}
        {pitchingStats && pitchingStats.length > 0 && (
          <>
            <Last3PitchingGames games={last3Pitching} />
          </>
        )}
        {hittingStats && hittingStats.length > 0 && (
          <>
            <HittingStats stats={hittingStats} />
          </>
        )}

        {pitchingStats && pitchingStats.length > 0 && (
          <>
            <PitchingStats stats={pitchingStats} />
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerModal;
