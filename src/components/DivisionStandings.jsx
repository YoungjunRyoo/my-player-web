// src/components/DivisionStandings.jsx
function DivisionStandings({ division }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{division.league.name} - {division.division.name}</h3>
      <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>Win %</th>
          </tr>
        </thead>
        <tbody>
          {division.teamRecords.map((team) => (
            <tr key={team.team.id}>
              <td>{team.team.name}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.winningPercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DivisionStandings;
