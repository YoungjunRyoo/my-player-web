// src/components/HomerunStanding.jsx
import { useEffect, useState } from 'react';
import { getHomerunStanding, getPlayerById, getTeamById } from '../services/mlbApi';
import PlayerModal from './PlayerModal';
import TeamModal from './TeamModal';
import '../css/HomerunStanding.css';

const TEAM_NAME_ABBREVIATION = {
  108: "LAA", 109: "ARI", 110: "BAL", 111: "BOS", 112: "CHC", 113: "CIN", 114: "CLE",
  115: "COL", 116: "DET", 117: "HOU", 118: "KC", 119: "LAD", 120: "WSH", 121: "NYM",
  133: "OAK", 134: "PIT", 135: "SD", 136: "SEA", 137: "SF", 138: "STL", 139: "TB",
  140: "TEX", 141: "TOR", 142: "MIN", 143: "PHI", 144: "ATL", 145: "CWS", 146: "MIA",
  147: "NYY", 158: "MIL"
};

function HomerunStanding() {
  const [hrStanding, setHrStanding] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const hr = await getHomerunStanding(2025);
      if (hr?.leagueLeaders?.[0]) {
        setHrStanding(hr.leagueLeaders[0].leaders);
      }
    }
    fetchData();
  }, []);

  const handlePlayerClick = async (playerId) => {
    try {
      const player = await getPlayerById(playerId);
      setSelectedPlayer(player.people[0]);
      setIsPlayerModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch player info:', error);
    }
  };

  const handleTeamClick = async (teamId) => {
    try {
      const teamResp = await getTeamById(teamId); // see service stub below
      // Depending on your API shape, this might be teamResp.teams[0]
      const team = teamResp.teams ? teamResp.teams[0] : teamResp;
      setSelectedTeam(team);
      setIsTeamModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch team info:', error);
    }
  };

  const closePlayerModal = () => setIsPlayerModalOpen(false);
  const closeTeamModal = () => setIsTeamModalOpen(false);

  return (
    <div className="homerun-standing">
      <div className="homerun-header">
        <span>HOME RUN</span>
        <span>HR</span>
      </div>

      {hrStanding.slice(0, 9).map((p) => (
        <div className="player-row" key={p.person.id}>
        <div className="player-row" key={p.person.id}>
          <span>{p.rank}</span>

          <span>
            <div
              className="player-name"
              role="button"
              tabIndex={0}
              onClick={() => handlePlayerClick(p.person.id)}
              onKeyDown={(e) => e.key === 'Enter' && handlePlayerClick(p.person.id)}
            >
              {p.person.fullName}
            </div>

            <div
              className="team-abbr clickable-team"
              role="button"
              tabIndex={0}
              onClick={() => handleTeamClick(p.team.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleTeamClick(p.team.id)}
              title="View team details"
            >
              {TEAM_NAME_ABBREVIATION[p.team.id] || p.team.abbreviation || '—'}
            </div>
          </span>

          <span>{p.value}</span>
        </div>
      ))}

      {isPlayerModalOpen && (
        <PlayerModal player={selectedPlayer} onClose={closePlayerModal} />
      )}

      {isTeamModalOpen && (
        <TeamModal team={selectedTeam} onClose={closeTeamModal} />
      )}
    </div>
  );
}

export default HomerunStanding;
