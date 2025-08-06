import '../css/Logo.css';

function Logo(prop) {
  function handleLogo(name) {
    let tmp = '';

    if (name === 'New York Mets') tmp = 'NM.png';
    else if (name === 'Arizona Diamondbacks') tmp = 'Arizona.png';
    else if (name === 'Cleveland Guardians') tmp = 'Cleveland.png';
    else if (name === 'Chicago Cubs') tmp = 'Chicago.png';
    else if (name === 'Miami Marlins') tmp = 'Miami.png';
    else if (name === 'Tampa Bay Rays') tmp = 'Tempa.png';
    else if (name === 'Seattle Mariners') tmp = 'Seattle.png';
    else if (name === 'Atlanta Braves') tmp = 'Atlanta.png';
    else if (name === 'Texas Rangers') tmp = 'Texas.png';
    else if (name === 'Washington Nationals') tmp = 'Washington.png';
    else if (name === 'Chicago White Sox') tmp = 'ChicagoW.png';
    else if (name === 'San Diego Padres') tmp = 'Sandiego.png';
    else if (name === 'Minnesota Twins') tmp = 'Minesota.png';
    else if (name === 'Cincinnati Reds') tmp = 'Cinci.png';
    else if (name === 'Boston Red Sox') tmp = 'BostonR.png';
    else if (name === 'New York Yankees') tmp = 'NY.png';
    else if (name === 'Athletics') tmp = 'Athele.png';
    else if (name === 'St. Louis Cardinals') tmp = 'Saint.png';
    else if (name === 'Baltimore Orioles') tmp = 'Bolti.png';
    else if (name === 'Los Angeles Angels') tmp = 'LAA.png';
    else if (name === 'Philadelphia Phillies') tmp = 'Phillies.png';
    else if (name === 'Detroit Tigers') tmp = 'Tigers.png';
    else if (name === 'Kansas City Royals') tmp = 'Royals.png';
    else if (name === 'Los Angeles Dodgers') tmp = 'Dodgers.png';
    else if (name === 'Milwaukee Brewers') tmp = 'Brewers.png';
    else if (name === 'Houston Astros') tmp = 'Astros.png';
    else if (name === 'Colorado Rockies') tmp = 'Rockies.png';
    else if (name === 'San Francisco Giants') tmp = 'Giants.png';
    else if (name === 'Toronto Blue Jays') tmp = 'BlueJays.png';
    else if (name === 'Pittsburgh Pirates') tmp = 'Pirates.png';
    else tmp = 'react.svg';

    return <img className="logo" src={`/assets/${tmp}`} />;
  }

  return (
    <>
      <div className="logo-score">
        {handleLogo(prop.name)}
        <p className="score">{prop.score}</p>
      </div>
    </>
  );
}

export default Logo;
