// src/components/HittingStats.jsx
import '../css/HittingStats.css';

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


function HittingStats({ stats }) {
  return (
    <div className="stats-section">
      <h3>Career Hitting Stats</h3>
      <table className="hitting-stats-table">
        <thead>
          <tr>
            <th className="col-season">Season</th>
            <th className="col-team">Team</th>
            <th className="col-avg">AVG</th>
            <th className="col-h">H</th>
            <th className="col-2b">2B</th>
            <th className="col-3b">3B</th>
            <th className="col-hr">HR</th>
            <th className="col-sb">SB</th>
            <th className="col-r">R</th>
            <th className="col-rbi">RBI</th>
            <th className="col-so">SO</th>
            <th className="col-ops">OPS</th>
            <th className="col-g">G</th>
            <th className="col-ab">AB</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr key={i}>
              <td className="col-season">{s.season}</td>
              <td className="col-team">{TEAM_ID_TO_ABBR[s.teamId]}</td>
              <td className="col-avg">{s.avg}</td>
              <td className="col-h">{s.hits}</td>
              <td className="col-2b">{s.doubles}</td>
              <td className="col-3b">{s.triples}</td>
              <td className="col-hr">{s.homeRuns}</td>
              <td className="col-sb">{s.stolenBases}</td>
              <td className="col-r">{s.runs}</td>
              <td className="col-rbi">{s.rbi}</td>
              <td className="col-so">{s.strikeOuts}</td>
              <td className="col-ops">{s.ops}</td>
              <td className="col-g">{s.gamesPlayed}</td>
              <td className="col-ab">{s.atBats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default HittingStats;
