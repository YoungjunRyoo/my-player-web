import '../css/Last3Games.css';

const TEAM_ID_MAP = {
  'Los Angeles Angels': 108,
  'Arizona Diamondbacks': 109,
  'Baltimore Orioles': 110,
  'Boston Red Sox': 111,
  'Chicago Cubs': 112,
  'Cincinnati Reds': 113,
  'Cleveland Guardians': 114,
  'Colorado Rockies': 115,
  'Detroit Tigers': 116,
  'Houston Astros': 117,
  'Kansas City Royals': 118,
  'Los Angeles Dodgers': 119,
  'Washington Nationals': 120,
  'New York Mets': 121,
  'Oakland Athletics': 133,
  'Pittsburgh Pirates': 134,
  'San Diego Padres': 135,
  'Seattle Mariners': 136,
  'San Francisco Giants': 137,
  'St. Louis Cardinals': 138,
  'Tampa Bay Rays': 139,
  'Texas Rangers': 140,
  'Toronto Blue Jays': 141,
  'Minnesota Twins': 142,
  'Philadelphia Phillies': 143,
  'Atlanta Braves': 144,
  'Chicago White Sox': 145,
  'Miami Marlins': 146,
  'New York Yankees': 147,
  'Milwaukee Brewers': 158,
};

function Last3HittingGames({ games }) {
  return (
    <div className="last3games-section">
      <h3>Hitting In Last 3 Games</h3>
      <table className="last3games-table">
        <thead>
          <tr>
            <th>Last 3 Games</th>
            <th>AB</th>
            <th>H</th>
            <th>HR</th>
            <th>RBI</th>
          </tr>
        </thead>
        <tbody>
          {[...games].reverse().map((g, i) => (
            <tr key={i}>
              <td>
                <div className="game-cell-date">{g.date}</div>
                <div className="game-cell-opponent">
                  <p>vs&nbsp;&nbsp;</p>
                  <img
                    src={`https://www.mlbstatic.com/team-logos/${
                      TEAM_ID_MAP[g.opponent]
                    }.svg`}
                    alt={g.opponent}
                    className="game-cell-logo"
                  />
                </div>
              </td>
              <td>{g.atBats}</td>
              <td>{g.hits}</td>
              <td>{g.homeRuns}</td>
              <td>{g.rbi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Last3HittingGames;
