import '../css/Last3Games.css';

function Last3PitchingGames({ games }) {
    return (
        <div className="last3games-section">
            <h3>Pitching In Last 3 Games</h3>
            <table className="last3games-table">
                <thead>
                    <tr>
                        <th>Last 3 Games</th>
                        <th>IP</th>
                        <th>H</th>
                        <th>ER</th>
                        <th>BB</th>
                        <th>SO</th>
                    </tr>
                </thead>
                <tbody>
                    {[...games].reverse().map((g, i) => (
                        <tr key={i}>
                            <td>
                                <div className="game-cell-date">{g.date}</div>
                                @<div className="game-cell-opponent">{g.opponent}</div>
                            </td>
                            <td>{g.inningsPitched}</td>
                            <td>{g.hits}</td>
                            <td>{g.earnedRuns}</td>
                            <td>{g.walks}</td>
                            <td>{g.strikeOuts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Last3PitchingGames;
