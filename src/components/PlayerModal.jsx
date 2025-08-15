// src/components/PlayerModal.jsx
import '../css/PlayerModal.css';

function PlayerModal({ player, onClose }) {
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
            <h2>{player.fullName} #{player.primaryNumber || 'N/A'}</h2>
            <p><strong>Position:</strong> {player.primaryPosition?.name}</p>
            <p><strong>Team ID:</strong> {player.currentTeam?.id}</p>
            <p><strong>Height:</strong> {player.height}</p>
            <p><strong>Weight:</strong> {player.weight} lbs</p>
            <p><strong>Throws:</strong> {player.pitchHand?.description}</p>
            <p><strong>Bats:</strong> {player.batSide?.description}</p>
            <p><strong>Birth Date:</strong> {player.birthDate}</p>
            <p><strong>Birthplace:</strong> {player.birthCity}, {player.birthStateProvince}, {player.birthCountry}</p>
            <p><strong>MLB Debut:</strong> {player.mlbDebutDate}</p>
            <p><strong>Draft Year:</strong> {player.draftYear || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;
