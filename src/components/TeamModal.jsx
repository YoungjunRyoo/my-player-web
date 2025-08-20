import '../css/TeamModal.css';
import TeamGameSummary from './TeamGameSummary';
import TeamRoster from './TeamRoster';


const teamFallbackMap = {
  108: { capacity: '45,050', officialTicketSite: 'https://www.mlb.com/angels/tickets' },
  109: { capacity: '48,686', officialTicketSite: 'https://www.mlb.com/diamondbacks/tickets' },
  110: { capacity: '45,971', officialTicketSite: 'https://www.mlb.com/orioles/tickets' },
  111: { capacity: '37,755', officialTicketSite: 'https://www.mlb.com/redsox/tickets' },
  112: { capacity: '41,649', officialTicketSite: 'https://www.mlb.com/cubs/tickets' },
  113: { capacity: '42,319', officialTicketSite: 'https://www.mlb.com/reds/tickets' },
  114: { capacity: '34,788', officialTicketSite: 'https://www.mlb.com/guardians/tickets' },
  115: { capacity: '50,398', officialTicketSite: 'https://www.mlb.com/rockies/tickets' },
  116: { capacity: '41,083', officialTicketSite: 'https://www.mlb.com/tigers/tickets' },
  117: { capacity: '41,168', officialTicketSite: 'https://www.mlb.com/astros/tickets' },
  118: { capacity: '37,903', officialTicketSite: 'https://www.mlb.com/royals/tickets' },
  119: { capacity: '56,000', officialTicketSite: 'https://www.mlb.com/dodgers/tickets' },
  120: { capacity: '41,339', officialTicketSite: 'https://www.mlb.com/nationals/tickets' },
  121: { capacity: '41,922', officialTicketSite: 'https://www.mlb.com/mets/tickets' },
  133: { capacity: '46,847', officialTicketSite: 'https://www.mlb.com/athletics/tickets' },
  134: { capacity: '38,747', officialTicketSite: 'https://www.mlb.com/pirates/tickets' },
  135: { capacity: '40,209', officialTicketSite: 'https://www.mlb.com/padres/tickets' },
  136: { capacity: '47,929', officialTicketSite: 'https://www.mlb.com/mariners/tickets' },
  137: { capacity: '41,915', officialTicketSite: 'https://www.mlb.com/giants/tickets' },
  138: { capacity: '45,494', officialTicketSite: 'https://www.mlb.com/cardinals/tickets' },
  139: { capacity: '25,000', officialTicketSite: 'https://www.mlb.com/rays/tickets' },
  140: { capacity: '40,300', officialTicketSite: 'https://www.mlb.com/rangers/tickets' },
  141: { capacity: '49,282', officialTicketSite: 'https://www.mlb.com/bluejays/tickets' },
  142: { capacity: '38,544', officialTicketSite: 'https://www.mlb.com/twins/tickets' },
  143: { capacity: '42,792', officialTicketSite: 'https://www.mlb.com/phillies/tickets' },
  144: { capacity: '41,149', officialTicketSite: 'https://www.mlb.com/braves/tickets' },
  145: { capacity: '40,615', officialTicketSite: 'https://www.mlb.com/whitesox/tickets' },
  146: { capacity: '36,742', officialTicketSite: 'https://www.mlb.com/marlins/tickets' },
  147: { capacity: '50,287', officialTicketSite: 'https://www.mlb.com/yankees/tickets' },
  158: { capacity: '41,900', officialTicketSite: 'https://www.mlb.com/brewers/tickets' },
  159: { capacity: '48,686', officialTicketSite: 'https://www.mlb.com/d-backs/tickets' },
};


function TeamModal({ team, onClose }) {
  if (!team) return null;

  const fallback = teamFallbackMap[team.id] || {};
  const capacity = team.venue?.capacity || fallback.capacity || '—';
  const ticketSite = team.officialSite || fallback.officialTicketSite || null;

  return (
    <div className="team-modal-overlay" role="dialog" aria-modal="true">

      <div className="team-modal">
        <button
          className="team-modal-close-btn"
          onClick={onClose}
          aria-label="Close Team Modal"
        >
          ✕
        </button>

        <div className="team-modal-header-grid">
          <img
            src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
            alt={`${team.name} logo`}
            className="team-modal-logo-sm"
          />
          <div className="team-modal-title-wrap">
            <h2 className="team-modal-title">{team.name}</h2>
            <hr className="team-modal-divider"/>
            <div><strong>Founded:</strong> {team.firstYearOfPlay || '—'}</div>
            <div><strong>City / Venue:</strong> {team.locationName}{team.venue?.name ? `, ${team.venue.name}` : ''}</div>
            <div><strong>Capacity:</strong> {capacity}</div>
            <div><strong>Division:</strong> {team.division?.name || '—'}</div>
            <div>
              <strong>Official Ticket site:</strong>{' '}
              {ticketSite ? (
                <a
                  className="team-modal-link"
                  href={ticketSite}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ticketSite.replace(/^https?:\/\//, '')}
                </a>
              ) : '—'}
            </div>
            <hr className="team-modal-divider"/>
          </div>
        </div>

          <TeamGameSummary teamId={team.id} />
          <TeamRoster teamId={team.id} />
      </div>

    </div>
  );
}

export default TeamModal;
