// src/components/PlayerModal.jsx
import { useEffect, useState } from 'react';
import '../css/PlayerModal.css';
import { getPlayerHittingStats, getPlayerPitchingStats } from '../services/mlbApi';
import HittingStats from './HittingStats';
import PitchingStats from './PitchingStats';

const TEAM_NAME_MAP = {
  108: "Los Angeles Angels", 109: "Arizona Diamondbacks", 110: "Baltimore Orioles", 111: "Boston Red Sox",
  112: "Chicago Cubs", 113: "Cincinnati Reds", 114: "Cleveland Guardians", 115: "Colorado Rockies",
  116: "Detroit Tigers", 117: "Houston Astros", 118: "Kansas City Royals", 119: "Los Angeles Dodgers",
  120: "Washington Nationals", 121: "New York Mets", 133: "Oakland Athletics", 134: "Pittsburgh Pirates",
  135: "San Diego Padres", 136: "Seattle Mariners", 137: "San Francisco Giants", 138: "St. Louis Cardinals",
  139: "Tampa Bay Rays", 140: "Texas Rangers", 141: "Toronto Blue Jays", 142: "Minnesota Twins",
  143: "Philadelphia Phillies", 144: "Atlanta Braves", 145: "Chicago White Sox", 146: "Miami Marlins",
  147: "New York Yankees", 158: "Milwaukee Brewers"
};


function PlayerModal({ player, onClose }) {
  const [hittingStats, setHittingStats] = useState(null);
  const [pitchingStats, setPitchingStats] = useState(null);

  useEffect(() => {
    if (!player) return;

    const fetchStats = async () => {
      if (player.primaryPosition?.type === 'Pitcher') {
        const pitching = await getPlayerPitchingStats(player.id);
        setPitchingStats(pitching);
      } else if (player.primaryPosition?.type === 'Position Player') {
        const hitting = await getPlayerHittingStats(player.id);
        setHittingStats(hitting);
      } else {
        // Two-way player: fetch both
        const hitting = await getPlayerHittingStats(player.id);
        const pitching = await getPlayerPitchingStats(player.id);
        setHittingStats(hitting);
        setPitchingStats(pitching);
      }
    };

    fetchStats();
  }, [player]);

  if (!player) return null;

  return (
    <div className="modal-overlay">
      <div className="player-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.id}/headshot/67/current.png`}
            alt={player.fullName}
            className="player-img"
          />
          <div className="player-info">
            <h1>{player.fullName} #{player.primaryNumber || 'N/A'}</h1>
            <button className="follow-btn">Follow</button>
            <p><strong>Team:</strong> {TEAM_NAME_MAP[player.currentTeam?.id] || 'N/A'}</p>
            <p><strong>Position:</strong> {player.primaryPosition?.name}</p>
            <p><strong>MLB Debut:</strong> {player.mlbDebutDate}</p>
            <p><strong>Draft Year:</strong> {player.draftYear || 'N/A'}</p>
            <p><strong>Birthplace:</strong> {player.birthCity}, {player.birthStateProvince}, {player.birthCountry}</p>
            <p><strong>Birth Date:</strong> {player.birthDate}</p>
            <p><strong>Height:</strong> {player.height}</p>
            <p><strong>Weight:</strong> {player.weight} lbs</p>
            <p><strong>Throws:</strong> {player.pitchHand?.description}</p>
            <p><strong>Bats:</strong> {player.batSide?.description}</p>
          </div>
        </div>

        {hittingStats && hittingStats.length > 0 && <HittingStats stats={hittingStats}/>}
        {pitchingStats && pitchingStats.length > 0 && <PitchingStats stats={pitchingStats} />}
      </div>
    </div>
  );
}

export default PlayerModal;
