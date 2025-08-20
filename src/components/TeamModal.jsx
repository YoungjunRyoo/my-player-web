// src/components/TeamModal.jsx
import '../css/TeamModal.css';

function TeamModal({ team, onClose }) {
  if (!team) return null;

  return (
    <div className="modal-overlay">
      <div className="team-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img
            src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
            alt={`${team.name} logo`}
            className="team-logo-large"
          />
          <div className="team-info">
            <h2>{team.name}</h2>
            <p><strong>Location:</strong> {team.locationName}, {team.venue?.name}</p>
            <p><strong>Abbreviation:</strong> {team.abbreviation}</p>
            <p><strong>League:</strong> {team.league?.name}</p>
            <p><strong>Division:</strong> {team.division?.name}</p>
            <p><strong>First Year of Play:</strong> {team.firstYearOfPlay}</p>
            <p><strong>Spring Venue:</strong> {team.springVenue?.name || 'N/A'}</p>
            <p><strong>Official Site:</strong> <a href={team.officialSite} target="_blank" rel="noreferrer">{team.officialSite}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamModal;
