const BASE_URL = 'https://statsapi.mlb.com/api/v1';

export async function getPlayerById(playerId) {
  try {
    const response = await fetch(       //뒤에 currentTeam 붙임으로써 팀 이름도 불러올수있음
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
  const res = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=yearByYear&group=hitting`);
  const data = await res.json();
  const stats = data.stats[0]?.splits || [];

  return stats.map((s) => ({
    season: s.season,
    teamAbbreviation: s.team?.abbreviation || '',
    avg: s.stat.avg,
    homeRuns: s.stat.homeRuns,
    rbi: s.stat.rbi,
    ops: s.stat.ops,
  }));
}

export async function getPlayerPitchingStats(playerId) {
  const res = await fetch(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=yearByYear&group=pitching`);
  const data = await res.json();
  const stats = data.stats[0]?.splits || [];

  return stats.map((s) => ({
    season: s.season,
    teamAbbreviation: s.team?.abbreviation || '',
    era: s.stat.era,
    wins: s.stat.wins,
    losses: s.stat.losses,
    strikeOuts: s.stat.strikeOuts,
    whip: s.stat.whip,
  }));
}

export async function getBattingAverageStanding(season){
  try{
    const res = await fetch(
      `${BASE_URL}/stats/leaders?leaderCategories=battingAverage&season${season}&sportId=1&limit=10`
    )
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  }
  catch(error){
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getWinStanding(season){
  try{
    const res = await fetch(
      `${BASE_URL}/stats/leaders?leaderCategories=wins&season=${season}&sportId=1&limit=10`
    );
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  }
  catch(error){
    console.error('Error fetching standings:', error);
    return null;
  }
}

export async function getHomerunStanding(season){
  try{
    const res = await fetch(
      `${BASE_URL}/stats/leaders?leaderCategories=homeRuns&sportId=1&season=${season}&limit=10`
    );
    if (!res.ok) throw new Error('Failed to fetch standings');
    return await res.json();
  }
  catch(error){
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
