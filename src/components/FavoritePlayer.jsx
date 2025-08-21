import { useEffect, useState } from 'react';
import {
  getPlayerById,
  getPlayerRankings,
  getPlayerHittingStats,
  getPlayerLast3HittingGames,
  getPlayerPitchingStats,
  getPlayerLast3PitchingGames,
} from '../services/mlbApi';
import LatestGameResult from './LatestGameResult';
import '../css/FavoritePlayer.css';

function FavoritePlayer({ id }) {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentRanking, setCurrentRanking] = useState(null);
  const [hittingStats, setHittingStats] = useState(null);
  const [pitchingStats, setPitchingStats] = useState(null);
  const [last3Hitting, setLast3Hitting] = useState([]);
  const [last3Pitching, setLast3Pitching] = useState([]);

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

    'Buffalo Bisons': 'BUF (AAA)',
    'Charlotte Knights': 'CLT (AAA)',
    'Gwinnett Stripers': 'GWI (AAA)',
    'Indianapolis Indians': 'IND (AAA)',
    'Jacksonville Jumbo Shrimp': 'JAX (AAA)',
    'Lehigh Valley IronPigs': 'LV (AAA)',
    'Louisville Bats': 'LOU (AAA)',
    'Memphis Redbirds': 'MEM (AAA)',
    'Nashville Sounds': 'NAS (AAA)',
    'Norfolk Tides': 'NOR (AAA)',
    'Omaha Storm Chasers': 'OMA (AAA)',
    'Reno Aces': 'REN (AAA)',
    'Rochester Red Wings': 'ROC (AAA)',
    'Sacramento River Cats': 'SAC (AAA)',
    'Salt Lake Bees': 'SL (AAA)',
    'Scranton/Wilkes-Barre RailRiders': 'SWB (AAA)',
    'Syracuse Mets': 'SYR (AAA)',
    'Tacoma Rainiers': 'TAC (AAA)',
    'Toledo Mud Hens': 'TOL (AAA)',
    'Iowa Cubs': 'IOW (AAA)',
    'Oklahoma City Dodgers': 'OKC (AAA)',
    'Round Rock Express': 'RR (AAA)',
    'Sugar Land Space Cowboys': 'SUG (AAA)',
    'Worcester Red Sox': 'WOR (AAA)',
    'Columbus Clippers': 'COL (AAA)',
    'El Paso Chihuahuas': 'ELP (AAA)',
    'Las Vegas Aviators': 'LV (AAA)',
    'St. Paul Saints': 'SP (AAA)',
    'Durham Bulls': 'DUR (AAA)',

    'Akron RubberDucks': 'AKR (AA)',
    'Amarillo Sod Poodles': 'AMR (AA)',
    'Arkansas Travelers': 'ARK (AA)',
    'Biloxi Shuckers': 'BIL (AA)',
    'Birmingham Barons': 'BIR (AA)',
    'Bowie Baysox': 'BOW (AA)',
    'Corpus Christi Hooks': 'CC (AA)',
    'Erie SeaWolves': 'ERI (AA)',
    'Harrisburg Senators': 'HAR (AA)',
    'Hartford Yard Goats': 'HRF (AA)',
    'Montgomery Biscuits': 'MNT (AA)',
    'New Hampshire Fisher Cats': 'NHF (AA)',
    'Northwest Arkansas Naturals': 'NWA (AA)',
    'Pensacola Blue Wahoos': 'PEN (AA)',
    'Portland Sea Dogs': 'PSD (AA)',
    'Reading Fightin Phils': 'REA (AA)',
    'Richmond Flying Squirrels': 'RCH (AA)',
    'Rocket City Trash Pandas': 'RCT (AA)',
    'San Antonio Missions': 'SA (AA)',
    'Somerset Patriots': 'SOM (AA)',
    'Springfield Cardinals': 'SPR (AA)',
    'Tennessee Smokies': 'TEN (AA)',
    'Tulsa Drillers': 'TUL (AA)',
    'Wichita Wind Surge': 'WIC (AA)',
  };

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

  const TEAM_COLORS = {
    'Los Angeles Angels': '#BA0021',
    'Arizona Diamondbacks': '#A71930',
    'Baltimore Orioles': '#DF4601',
    'Boston Red Sox': '#BD3039',
    'Chicago Cubs': '#0E3386',
    'Cincinnati Reds': '#C6011F',
    'Cleveland Guardians': '#0C2340',
    'Colorado Rockies': '#33006F',
    'Detroit Tigers': '#0C2340',
    'Houston Astros': '#EB6E1F',
    'Kansas City Royals': '#004687',
    'Los Angeles Dodgers': '#005A9C',
    'Washington Nationals': '#AB0003',
    'New York Mets': '#002D72',
    'Oakland Athletics': '#003831',
    'Pittsburgh Pirates': '#FDB827',
    'San Diego Padres': '#2F241D',
    'Seattle Mariners': '#0C2C56',
    'San Francisco Giants': '#FD5A1E',
    'St. Louis Cardinals': '#C41E3A',
    'Tampa Bay Rays': '#092C5C',
    'Texas Rangers': '#003278',
    'Toronto Blue Jays': '#134A8E',
    'Minnesota Twins': '#002B5C',
    'Philadelphia Phillies': '#E81828',
    'Atlanta Braves': '#13274F',
    'Chicago White Sox': '#27251F',
    'Miami Marlins': '#00A3E0',
    'New York Yankees': '#1C2841',
    'Milwaukee Brewers': '#12284B',
  };

  useEffect(() => {
    const fetchStats = async (player) => {
      const type = player.primaryPosition?.type;

      if (type === 'Pitcher' || type === 'Two-Way Player') {
        const pitching = await getPlayerPitchingStats(id);
        const pitchingGames = await getPlayerLast3PitchingGames(id);
        setPitchingStats(pitching);
        setLast3Pitching(pitchingGames);
      }

      if (type !== 'Pitcher' || type === 'Two-Way Player') {
        const hitting = await getPlayerHittingStats(id);
        const hittingGames = await getPlayerLast3HittingGames(id);
        setHittingStats(hitting);
        setLast3Hitting(hittingGames);
      }
    };

    const fetchPlayer = async () => {
      try {
        const response = await getPlayerById(id);
        const response_rank = await getPlayerRankings(id);
        const player = response.people[0];

        setCurrentPlayer(player);
        setCurrentRanking(response_rank);
        await fetchStats(player);
      } catch (error) {
        console.error('Failed to fetch player data:', error);
      }
    };

    fetchPlayer();
  }, [id]);

  useEffect(() => {
    console.log(currentPlayer);
  }, [currentPlayer]);

  //   useEffect(() => {
  //     console.log(hittingStats);
  //   }, [hittingStats]);

  //   useEffect(() => {
  //     console.log(last3Hitting);
  //   }, [last3Hitting]);

  if (!currentPlayer) {
    return <div>Loading player info...</div>;
  }

  const type = currentPlayer.primaryPosition?.type;
  const isPitcher = type === 'Pitcher';
  const isHitter = type !== 'Pitcher';
  const isTwoWay = type === 'Two-Way Player';

  return (
    <div className="player-card">
      <div className="info">
        <img
          className="img"
          src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${id}/headshot/67/current.png`}
          onError={(e) => {
            e.target.onerror = null; // 무한 루프 방지
            e.target.src = '../../public/images/logo.png'; // 대체 이미지 경로
          }}
        />
        <div className="player_name_positon_following">
          <p className="favorite-player-name">{`${currentPlayer.fullName}`}</p>
          <div>
            <p className="player-position">
              {`${
                mlbTeamAbbreviations[currentPlayer.currentTeam.name] ||
                currentPlayer.currentTeam.name
              } · ${currentPlayer.primaryPosition.abbreviation} · #${
                currentPlayer.primaryNumber
              }`}
            </p>
          </div>
          <div className="player-following-box">
            <p className="player-following-text">Following</p>
          </div>
        </div>
      </div>
      <p className="Ranking">Ranking</p>
      <div className="Ranking-components">
        <div
          className="Ranking-component"
          style={{
            backgroundColor:
              TEAM_COLORS[currentPlayer.currentTeam.name] || '#252525',
          }}
        >
          <p className="Ranking-text">AVG</p>
          <div className="line"></div>
          <p className="Ranking-text">
            {currentRanking.AVG.rank !== 0 ? currentRanking.AVG.rank : '-'}
          </p>
        </div>
        <div
          className="Ranking-component"
          style={{
            backgroundColor:
              TEAM_COLORS[currentPlayer.currentTeam.name] || '#252525',
          }}
        >
          <p className="Ranking-text">HR</p>
          <div className="line"></div>
          <p className="Ranking-text">
            {currentRanking.HR.rank !== 0 ? currentRanking.HR.rank : '-'}
          </p>
        </div>
        <div
          className="Ranking-component"
          style={{
            backgroundColor:
              TEAM_COLORS[currentPlayer.currentTeam.name] || '#252525',
          }}
        >
          <p className="Ranking-text">OPS</p>
          <div className="line"></div>
          <p className="Ranking-text">
            {currentRanking.OPS.rank !== 0 ? currentRanking.OPS.rank : '-'}
          </p>
        </div>
        <div
          className="Ranking-component"
          style={{
            backgroundColor:
              TEAM_COLORS[currentPlayer.currentTeam.name] || '#252525',
          }}
        >
          <p className="Ranking-text">RBI</p>
          <div className="line"></div>
          <p className="Ranking-text">
            {currentRanking.RBI.rank !== 0 ? currentRanking.RBI.rank : '-'}
          </p>
        </div>
      </div>

      {/* {isPitcher && (
        <div className="Ranking-components">
          <div className="Ranking-component">
            <p className="Ranking-text">ERA</p>
            <div className="line"></div>
            <p className="Ranking-text">
              {currentRanking.HR.rank !== 0 ? currentRanking.HR.rank : '-'}
            </p>
          </div>
          <div className="Ranking-component">
            <p className="Ranking-text">SO</p>
            <div className="line"></div>
            <p className="Ranking-text">
              {currentRanking.OPS.rank !== 0 ? currentRanking.OPS.rank : '-'}
            </p>
          </div>
          <div className="Ranking-component">
            <p className="Ranking-text">W</p>
            <div className="line"></div>
            <p className="Ranking-text">
              {currentRanking.RBI.rank !== 0 ? currentRanking.RBI.rank : '-'}
            </p>
          </div>
        </div>
      )} */}

      {isHitter && last3Hitting.length > 0 && (
        <>
          <div className="RecentGameResult">
            <p className="Ranking">
              {last3Hitting[last3Hitting.length - 1].date}
            </p>
            <div className="match">
              <h4 className="versus">vs</h4>
              <img
                className="match-logo"
                src={`https://www.mlbstatic.com/team-logos/${
                  TEAM_ID_MAP[last3Hitting[last3Hitting.length - 1].opponent]
                }.svg`}
                alt={last3Hitting[last3Hitting.length - 1]?.opponent}
              />
            </div>
          </div>

          <LatestGameResult
            result={last3Hitting[last3Hitting.length - 1]}
            recent={true}
            overall={false}
            team={currentPlayer.currentTeam.name}
          />

          <div className="seasonData">
            <p className="Ranking">
              {`${hittingStats[hittingStats.length - 1]?.season} Season`}
            </p>
            <LatestGameResult
              result={hittingStats[hittingStats.length - 1]}
              recent={false}
              overall={true}
              team={currentPlayer.currentTeam.name}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default FavoritePlayer;
