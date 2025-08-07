import '../css/DivisionStandings.css';
function DivisionStandings({ division }) {
  
  const DIVISION_NAMES = {
    200: "AL West",
    201: "AL East",
    202: "AL Central",
    203: "NL West",
    204: "NL East",
    205: "NL Central",
};
  const TEAM_NAME_ABBREVIATION = {
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

  return (
    <div className="division-container">
      <h3 className="division-title">{DIVISION_NAMES[division.division?.id]}</h3>
      <div className="standings-header">
        <span>TEAM</span>
        <span>W</span>
        <span>L</span>
        <span>%</span>
        <span>GB</span>
      </div>
      {division.teamRecords.map((team) => (
        <div className="team-row" key={team.team.id}>
          <div className="team-info">
            <img src={`https://www.mlbstatic.com/team-logos/${team.team.id}.svg`} alt={team.team.name} className="team-logo" />
            <span>{TEAM_NAME_ABBREVIATION[team.team.id]}</span>
          </div>
          <span>{team.wins}</span>
          <span>{team.losses}</span>
          <span>{team.winningPercentage}</span>
          <span>{team.gamesBack}</span>
        </div>
      ))}
    </div>
  );
}

export default DivisionStandings;
