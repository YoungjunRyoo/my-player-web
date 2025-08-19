// src/components/PitchingStats.jsx
function PitchingStats({ stats }) {
  return (
    <div className="stats-section">
      <h2>Pitching Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Season</th><th>ERA</th><th>W</th><th>L</th><th>SO</th><th>WHIP</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr key={i}>
              <td>{s.season}</td>
              
              <td>{s.era}</td>
              <td>{s.wins}</td>
              <td>{s.losses}</td>
              <td>{s.strikeOuts}</td>
              <td>{s.whip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PitchingStats;
