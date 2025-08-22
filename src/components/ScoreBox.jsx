// import Logo from './Logo';  // no longer needed
import '../css/ScoreBox.css';

const mlbTeamAbbreviations = {
  'Arizona Diamondbacks': 'ARI',
  'Atlanta Braves': 'ATL',
  'Baltimore Orioles': 'BAL',
  'Boston Red Sox': 'BOS',
  'Chicago Cubs': 'CHC',
  'Chicago White Sox': 'CWS',
  'Cincinnati Reds': 'CIN',
  'Cleveland Guardians': 'CLE',
  'Colorado Rockies': 'COL',
  'Detroit Tigers': 'DET',
  'Houston Astros': 'HOU',
  'Kansas City Royals': 'KC',
  'Los Angeles Angels': 'LAA',
  'Los Angeles Dodgers': 'LAD',
  'Miami Marlins': 'MIA',
  'Milwaukee Brewers': 'MIL',
  'Minnesota Twins': 'MIN',
  'New York Mets': 'NYM',
  'New York Yankees': 'NYY',
  'Oakland Athletics': 'OAK',
  'Philadelphia Phillies': 'PHI',
  'Pittsburgh Pirates': 'PIT',
  'San Diego Padres': 'SD',
  'San Francisco Giants': 'SF',
  'Seattle Mariners': 'SEA',
  'St. Louis Cardinals': 'STL',
  'Tampa Bay Rays': 'TB',
  'Texas Rangers': 'TEX',
  'Toronto Blue Jays': 'TOR',
  'Washington Nationals': 'WSH',
};

function ScoreBox(prop) {
  return (
    <>
      <div className="result-contatiner">
        <div className="logo-score">
          <img
            className="logo"
            src={`https://www.mlbstatic.com/team-logos/${prop.away.team.id}.svg`}
            alt={prop.away.team.name}
          />

          <p className="score">{prop.away.score}</p>
        </div>

        <div className="vs-state">
          <p className="vs">vs</p>
        </div>

        <div className="logo-score">
          <img
            className="logo"
            src={`https://www.mlbstatic.com/team-logos/${prop.home.team.id}.svg`}
            alt={prop.home.team.name}
          />
          <p className="score">{prop.home.score}</p>
        </div>
      </div>
    </>
  );
}

export default ScoreBox;
