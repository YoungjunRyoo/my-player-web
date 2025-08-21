import '../css/Last3Games.css';

function LatestGameResult({ result, recent, overall, team }) {
  const TEAM_COLORS = {
    'Los Angeles Angels': 'rgba(186, 0, 33, 0.1)',
    'Arizona Diamondbacks': 'rgba(167, 25, 48, 0.1)',
    'Baltimore Orioles': 'rgba(223, 70, 1, 0.1)',
    'Boston Red Sox': 'rgba(189, 48, 57, 0.1)',
    'Chicago Cubs': 'rgba(14, 51, 134, 0.1)',
    'Cincinnati Reds': 'rgba(198, 1, 31, 0.1)',
    'Cleveland Guardians': 'rgba(12, 35, 64, 0.1)',
    'Colorado Rockies': 'rgba(51, 0, 111, 0.1)',
    'Detroit Tigers': 'rgba(12, 35, 64, 0.1)',
    'Houston Astros': 'rgba(235, 110, 31, 0.1)',
    'Kansas City Royals': 'rgba(0, 70, 135, 0.1)',
    'Los Angeles Dodgers': 'rgba(0, 90, 156, 0.1)',
    'Washington Nationals': 'rgba(171, 0, 3, 0.1)',
    'New York Mets': 'rgba(0, 45, 114, 0.1)',
    'Oakland Athletics': 'rgba(0, 56, 49, 0.1)',
    'Pittsburgh Pirates': 'rgba(253, 184, 39, 0.1)',
    'San Diego Padres': 'rgba(47, 36, 29, 0.1)',
    'Seattle Mariners': 'rgba(12, 44, 86, 0.1)',
    'San Francisco Giants': 'rgba(253, 90, 30, 0.1)',
    'St. Louis Cardinals': 'rgba(196, 30, 58, 0.1)',
    'Tampa Bay Rays': 'rgba(9, 44, 92, 0.1)',
    'Texas Rangers': 'rgba(0, 50, 120, 0.1)',
    'Toronto Blue Jays': 'rgba(19, 74, 142, 0.1)',
    'Minnesota Twins': 'rgba(0, 43, 92, 0.1)',
    'Philadelphia Phillies': 'rgba(232, 24, 40, 0.1)',
    'Atlanta Braves': 'rgba(19, 39, 79, 0.1)',
    'Chicago White Sox': 'rgba(39, 37, 31, 0.1)',
    'Miami Marlins': 'rgba(0, 163, 224, 0.1)',
    'New York Yankees': 'rgba(28, 40, 65, 0.1)',
    'Milwaukee Brewers': 'rgba(18, 40, 75, 0.1)',
  };

  return (
    <>
      {recent && (
        <div
          className="RecentGame"
          style={{ backgroundColor: TEAM_COLORS[team] }}
        >
          <table className="RecentGame-table">
            <thead>
              <tr>
                <th>AB</th>
                <th>R</th>
                <th>H</th>
                <th>RBI</th>
                <th>HR</th>
                <th>SO</th>
                <th>SB</th>
              </tr>
            </thead>
            <tbody>
              {
                <tr>
                  <td>{result.atBats}</td>
                  <td>{result.runs}</td>
                  <td>{result.hits}</td>
                  <td>{result.rbi}</td>
                  <td>{result.homeRuns}</td>
                  <td>{result.strikeOuts}</td>
                  <td>{result.stolenBases}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      )}
      {overall && (
        <div
          className="RecentGame"
          style={{ backgroundColor: TEAM_COLORS[team] }}
        >
          <table className="RecentGame-table">
            <thead>
              <tr>
                <th>AVG</th>
                <th>HR</th>
                <th>H</th>
                <th>RBI</th>
                <th>R</th>
                <th>SB</th>
                <th>OBP</th>
                <th>OPS</th>
              </tr>
            </thead>
            <tbody>
              {
                <tr>
                  <td>{result.avg}</td>
                  <td>{result.homeRuns}</td>
                  <td>{result.hits}</td>
                  <td>{result.rbi}</td>
                  <td>{result.runs}</td>
                  <td>{result.stolenBases}</td>
                  <td>{result.obp}</td>
                  <td>{result.ops}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default LatestGameResult;
