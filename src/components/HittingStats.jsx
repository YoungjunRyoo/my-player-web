// src/components/HittingStats.jsx
function HittingStats({ stats}) {
  return (
    <div className="stats-section">
      <h2>Hitting Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Season</th><th>AVG</th><th>HR</th><th>RBI</th><th>OPS</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr key={i}>
              <td>{s.season}</td>
              
              <td>{s.avg}</td>
              <td>{s.homeRuns}</td>
              <td>{s.rbi}</td>
              <td>{s.ops}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HittingStats;
