import Logo from './Logo';
import '../css/ScoreBox.css';

function ScoreBox(prop) {
  return (
    <>
      <div className="result-contatiner">
        <Logo name={prop.away.team.name} score={prop.away.score} />

        <div className="vs-state">
          <p className="vs">vs</p>
        </div>

        <Logo name={prop.home.team.name} score={prop.home.score} />
      </div>
    </>
  );
}

export default ScoreBox;
