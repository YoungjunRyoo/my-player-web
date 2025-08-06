const BASE_URL = "https://statsapi.mlb.com/api/v1";

export async function getStandings(season) {        //async allows the use of await inside the function.
  try {
    const res = await fetch(`${BASE_URL}/standings?leagueId=103,104&season=${season}`); // ? starts the query string. 
    if (!res.ok) throw new Error("Failed to fetch standings");           // Everything after the ? are key‑value pairs (parameters) sent to the API.
    return await res.json();    //res is not JSON, but calling res.json() converts the JSON response into a JS object you can use.

  } catch (error) {
    console.error("Error fetching standings:", error);
    return null;
  }
}