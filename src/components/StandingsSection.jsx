// src/components/StandingsSection.jsx
import { useEffect, useState } from "react";
import { getStandings } from "../services/mlbApi";
import DivisionStandings from "./DivisionStandings";

function StandingsSection() {
  const [divisions, setDivisions] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getStandings(2025);
      setDivisions(data.records);
    }
    fetchData();
  }, []);

  if (!divisions) return <p>Loading standings...</p>;

  return (
    <section>
      <h2>MLB Standings by Division (2025)</h2>
      {divisions.map((division) => (
        <DivisionStandings key={division.division.id} division={division} />
      ))}
    </section>
  );
}

export default StandingsSection;
