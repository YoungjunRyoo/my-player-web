const BASE_URL = 'https://statsapi.mlb.com/api/v1';

export async function getPlayerLast3HittingGames(playerId) {
  const res = await fetch(
    `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=gameLog&group=hitting`
  );
  const data = await res.json();
  const games = data.stats?.[0]?.splits || [];

  return games.slice(-3).map((g) => ({
    date: g.date,
    opponent: g.opponent?.name || 'N/A',
    hits: g.stat.hits,
    atBats: g.stat.atBats,
    runs: g.stat.runs,
    homeRuns: g.stat.homeRuns,
    rbi: g.stat.rbi,
    strikeOuts: g.stat.strikeOuts,
    stolenBases: g.stat.stolenBases,
  }));
}

export async function getPlayerLast3PitchingGames(playerId) {
  const res = await fetch(
    `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=gameLog&group=pitching`
  );
  const data = await res.json();
  const games = data.stats?.[0]?.splits || [];

  return games.slice(-3).map((g) => ({
    date: g.date,
    opponent: g.opponent?.name || 'N/A',
    inningsPitched: g.stat.inningsPitched,
    earnedRuns: g.stat.earnedRuns,
    strikeOuts: g.stat.strikeOuts,
    hits: g.stat.hits,
    walks: g.stat.baseOnBalls,
    runs: g.stat.runs,
    decisions: g.stat.decision,
  }));
}

export async function getPlayerById(playerId) {
  try {
    const response = await fetch(
      //뒤에 currentTeam 붙임으로써 팀 이름도 불러올수있음
      `${BASE_URL}/people/${playerId}?hydrate=currentTeam`
    );
    if (!response.ok) throw new Error('Failed to fetch player info');
    return await response.json();
  } catch (error) {
    console.error('Error fetching player info:', error);
    return null;
  }
}

export async function getPlayerHittingStats(playerId) {
  const res = await fetch(
    `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=yearByYear&group=hitting`
  );
  const data = await res.json();
  const stats = data.stats[0]?.splits || [];

  return stats.map((s) => ({
    season: s.season,
    teamId: s.team.id,
    gamesPlayed: s.stat.gamesPlayed,
    atBats: s.stat.atBats,
    runs: s.stat.runs,
    hits: s.stat.hits,
    doubles: s.stat.doubles,
    triples: s.stat.triples,
    homeRuns: s.stat.homeRuns,
    rbi: s.stat.rbi,
    strikeOuts: s.stat.strikeOuts,
    stolenBases: s.stat.stolenBases,
    avg: s.stat.avg,
    ops: s.stat.ops,
    obp: s.stat.obp,
  }));
}

export async function getPlayerPitchingStats(playerId) {
  const res = await fetch(
    `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=yearByYear&group=pitching`
  );
  const data = await res.json();
  const stats = data.stats[0]?.splits || [];

  return stats.map((s) => ({
    season: s.season,
    teamId: s.team.id,
    wins: s.stat.wins,
    losses: s.stat.losses,
    era: s.stat.era,
    gamesPlayed: s.stat.gamesPlayed,
    gamesStarted: s.stat.gamesStarted,
    holds: s.stat.holds,
    saves: s.stat.saves,
    inningsPitched: s.stat.inningsPitched,
    strikeOuts: s.stat.strikeOuts,
    whip: s.stat.whip,
  }));
}

export async function getBattingAverageStanding(season) {
  try {
    const res = await fetch(
      `${BASE_URL}/stats/leaders?leaderCategories=battingAverage&season${season}&sportId=1&limit=10`
    );
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getWinStanding(season) {
  try {
    const res = await fetch(
      `${BASE_URL}/stats/leaders?leaderCategories=wins&season=${season}&sportId=1&limit=10`
    );
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getHomerunStanding(season) {
  try {
    const res = await fetch(
      `${BASE_URL}/stats/leaders?leaderCategories=homeRuns&sportId=1&season=${season}&limit=10`
    );
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getStandings(season) {
  //async allows the use of await inside the function.
  try {
    const res = await fetch(
      `${BASE_URL}/standings?leagueId=103,104&season=${season}`
    ); // ? starts the query string.
    if (!res.ok) throw new Error('Failed to fetch standings'); // Everything after the ? are key‑value pairs (parameters) sent to the API.
    return await res.json(); //res is not JSON, but calling res.json() converts the JSON response into a JS object you can use.
  } catch (error) {
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getTodayGame() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate() - 2;
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');

  try {
    const res = await fetch(
      `${BASE_URL}/schedule?sportId=1&date=${year}-${monthStr}-${dayStr}`
    );
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getPlayer() {
  try {
    const res = await fetch(`${BASE_URL}/sports/1/players`);
    if (!res.ok) throw new Error('Failed to fetch boxscore');
    return await res.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    return null;
  }
}

export async function getHittingStats() {
  const res = await fetch(
    'https://statsapi.mlb.com/api/v1/stats?stats=season&group=hitting&gameType=R&limit=1000'
  );
  const data = await res.json();
  return data.stats[0].splits; // 모든 선수 스탯
}

export async function getPlayerRankings(playerId) {
  const splits = await getHittingStats();

  const sortedByOPS = [...splits].sort(
    (a, b) => parseFloat(b.stat.ops) - parseFloat(a.stat.ops)
  );
  const sortedByHR = [...splits].sort(
    (a, b) => b.stat.homeRuns - a.stat.homeRuns
  );
  const sortedByRBI = [...splits].sort((a, b) => b.stat.rbi - a.stat.rbi);

  const sortedByAVG = [...splits].sort((a, b) => b.stat.avg - a.stat.avg);

  const findRank = (list) =>
    list.findIndex((p) => p.player.id === playerId) + 1;

  return {
    OPS: {
      rank: findRank(sortedByOPS),
      value: splits.find((p) => p.player.id === playerId)?.stat.ops || 'N/A',
    },
    HR: {
      rank: findRank(sortedByHR),
      value:
        splits.find((p) => p.player.id === playerId)?.stat.homeRuns || 'N/A',
    },
    RBI: {
      rank: findRank(sortedByRBI),
      value: splits.find((p) => p.player.id === playerId)?.stat.rbi || 'N/A',
    },

    AVG: {
      rank: findRank(sortedByAVG),
      value: splits.find((p) => p.player.id === playerId)?.stat.avg || 'N/A',
    },
  };
}
