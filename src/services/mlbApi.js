const BASE_URL = 'https://statsapi.mlb.com/api/v1';

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
