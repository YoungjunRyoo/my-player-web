// src/components/PitchingStats.jsx
import '../css/PitchingStats.css'

const TEAM_ID_TO_ABBR = {
  108: "LAA", // Los Angeles Angels
  109: "ARI", // Arizona Diamondbacks
  110: "BAL", // Baltimore Orioles
  111: "BOS", // Boston Red Sox
  112: "CHC", // Chicago Cubs
  113: "CIN", // Cincinnati Reds
  114: "CLE", // Cleveland Guardians
  115: "COL", // Colorado Rockies
  116: "DET", // Detroit Tigers
  117: "HOU", // Houston Astros
  118: "KC",  // Kansas City Royals
  119: "LAD", // Los Angeles Dodgers
  120: "WSH", // Washington Nationals
  121: "NYM", // New York Mets
  133: "OAK", // Oakland Athletics
  134: "PIT", // Pittsburgh Pirates
  135: "SD",  // San Diego Padres
  136: "SEA", // Seattle Mariners
  137: "SF",  // San Francisco Giants
  138: "STL", // St. Louis Cardinals
  139: "TB",  // Tampa Bay Rays
  140: "TEX", // Texas Rangers
  141: "TOR", // Toronto Blue Jays
  142: "MIN", // Minnesota Twins
  143: "PHI", // Philadelphia Phillies
  144: "ATL", // Atlanta Braves
  145: "CWS", // Chicago White Sox
  146: "MIA", // Miami Marlins
  147: "NYY", // New York Yankees
  158: "MIL"  // Milwaukee Brewers
};

function PitchingStats({ stats }) {
  return (
    <div className="stats-section">
      <h3>Career Pitching Stats</h3>
      <table>
        <thead>
          <tr>
            <th className="col-season">Season</th>
            <th className="col-team">Team</th>
            <th className="col-wins">W</th>
            <th className="col-losses">L</th>
            <th className="col-era">ERA</th>
            <th className="col-games-played">G</th>
            <th className="col-games-started">GS</th>
            <th className="col-holds">HD</th>
            <th className="col-saves">SV</th>
            <th className="col-innings">IP</th>
            <th className="col-strikeouts">SO</th>
            <th className="col-whip">WHIP</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr key={i}>
              <td className="col-season">{s.season}</td>
              <td className="col-team">{TEAM_ID_TO_ABBR[s.teamId]}</td>
              <td className="col-wins">{s.wins}</td>
              <td className="col-losses">{s.losses}</td>
              <td className="col-era">{s.era}</td>
              <td className="col-games-played">{s.gamesPlayed}</td>
              <td className="col-games-started">{s.gamesStarted}</td>
              <td className="col-holds">{s.holds}</td>
              <td className="col-saves">{s.saves}</td>
              <td className="col-innings">{s.inningsPitched}</td>
              <td className="col-strikeouts">{s.strikeOuts}</td>
              <td className="col-whip">{s.whip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PitchingStats;
