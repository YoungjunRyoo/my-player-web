// import Logo from './Logo';  // no longer needed
import '../css/ScoreBox.css';

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
