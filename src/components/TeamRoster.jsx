// src/components/TeamRoster.jsx
import { useEffect, useState } from 'react';
import { fetchTeamRoster } from '../services/mlbApi';
import '../css/TeamRoster.css';

function TeamRoster({ teamId }) {
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoster() {
      setLoading(true);
      const data = await fetchTeamRoster(teamId);
      setRoster(data);
      setLoading(false);
    }

    if (teamId) loadRoster();
  }, [teamId]);

  if (loading) return <p>Loading roster...</p>;
  if (!roster.length) return <p>No roster found.</p>;

  return (
    <div className="team-roster-container">
      <h3 className="team-roster-title">Team Roster</h3>
      <table className="team-roster-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>B/T</th>
            <th>Ht</th>
            <th>Wt</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {roster.map(({ person, jerseyNumber, position }) => {
            const imgUrl = `https://img.mlbstatic.com/mlb-photos/image/upload/w_60,q_100/v1/people/${person.id}/headshot/67/current`;
            return (
              <tr key={person.id}>
                <td className="team-roster-player">
                  <img src={imgUrl} alt={person.fullName} />
                  <span>
                    {person.fullName}
                    {jerseyNumber && <span className="player-number"> #{jerseyNumber}</span>}
                  </span>
                </td>
                <td>{person.batSide?.code}/{person.pitchHand?.code}</td>
                <td>{person.height || '—'}</td>
                <td>{person.weight || '—'}</td>
                <td>{person.birthDate || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TeamRoster;
