import{useState, useEffect} from 'react';
import{getBattingAverageStanding} from '../services/mlbApi';
import '../css/BattingAverageStanding.css';

function BattingAverageStanding(){
    const [battingAverageStanding, setBattingAverageStanding] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const ba = await getBattingAverageStanding(2025);
            if (ba && ba.leagueLeaders && ba.leagueLeaders[1]) {
                setBattingAverageStanding(ba.leagueLeaders[1].leaders);
            }
        }
        fetchData();
    },[])

    const TEAM_NAME_ABBREVIATION = {
        108: "LAA", 109: "ARI", 110: "BAL", 111: "BOS", 112: "CHC", 113: "CIN", 114: "CLE",
        115: "COL", 116: "DET", 117: "HOU", 118: "KC", 119: "LAD", 120: "WSH", 121: "NYM",
        133: "OAK", 134: "PIT", 135: "SD", 136: "SEA", 137: "SF", 138: "STL", 139: "TB",
        140: "TEX", 141: "TOR", 142: "MIN", 143: "PHI", 144: "ATL", 145: "CWS", 146: "MIA",
        147: "NYY", 158: "MIL"
    };

    return(
        <div className="batting-average-standing">
            <div className="batting-average-header">
                <span>BATTING AVERAGE</span>
                <span>BA</span>
            </div>
            {battingAverageStanding.slice(0,9).map((p)=> (
                <div className="player-row" key={p.person.id}>
                    <span>{p.rank}</span>
                    <span>{p.person.fullName} <span className="team-abbr">{TEAM_NAME_ABBREVIATION[p.team.id]}</span></span>
                    <span>{p.value}</span>
                </div>                
            ))}
        </div>
    );
}
export default BattingAverageStanding;