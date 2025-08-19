import {getWinStanding, getPlayerById} from '../services/mlbApi.js';
import {useState, useEffect} from 'react';
import PlayerModal from './PlayerModal';
import '../css/WinStanding.css';

const TEAM_NAME_ABBREVIATION = {
    108: "LAA", 109: "ARI", 110: "BAL", 111: "BOS", 112: "CHC", 113: "CIN", 114: "CLE",
    115: "COL", 116: "DET", 117: "HOU", 118: "KC", 119: "LAD", 120: "WSH", 121: "NYM",
    133: "OAK", 134: "PIT", 135: "SD", 136: "SEA", 137: "SF", 138: "STL", 139: "TB",
    140: "TEX", 141: "TOR", 142: "MIN", 143: "PHI", 144: "ATL", 145: "CWS", 146: "MIA",
    147: "NYY", 158: "MIL"
};
function WinStanding(){
    const [winStanding, setWinStanding] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            const w = await getWinStanding(2025);
            if (w && w.leagueLeaders && w.leagueLeaders[0]) {
                setWinStanding(w.leagueLeaders[0].leaders);
            }
        }
        fetchData();
    },[])

    const handlePlayerClick = async (playerId) => {
        try {
            const player = await getPlayerById(playerId);  // await the async function
            setSelectedPlayer(player.people[0]);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch player info:', error);
        }
    };

  const closeModal = () => setIsModalOpen(false);

    return(
        <div className="win-standing">
            <div className="win-header">
                <span>Win</span>
                <span>W</span>
            </div>

            {winStanding.slice(0,9).map((p)=> (
                <div className="player-row" key={p.person.id}>
                    <span>{p.rank}</span>
                    <span><div className="player-name" onClick={() => handlePlayerClick(p.person.id)}>{p.person.fullName}</div><div className="team-abbr">{TEAM_NAME_ABBREVIATION[p.team.id]}</div></span>
                    <span>{p.value}</span>
                </div>                
            ))}

            {isModalOpen && (
                <PlayerModal player={selectedPlayer} onClose={closeModal}/>
            )}

        </div>
    );
}
export default WinStanding;