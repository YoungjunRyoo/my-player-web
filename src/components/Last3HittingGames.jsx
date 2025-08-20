import '../css/Last3Games.css';

function Last3HittingGames({ games }) {
    return (
        <div className="last3games-section">
            <h3>Hitting In Last 3 Games</h3>
            <table className="last3games-table">
                <thead>
                    <tr>
                        <th>Last 3 Games</th>
                        <th>AB</th>
                        <th>H</th>
                        <th>HR</th>
                        <th>RBI</th>
                    </tr>
                </thead>
                <tbody>
                    {[...games].reverse().map((g, i) => (
                        <tr key={i}>
                            <td>
                                <div className="game-cell-date">{g.date}</div>
                                @ <div className="game-cell-opponent">{g.opponent}</div>
                            </td>
                            <td>{g.atBats}</td>
                            <td>{g.hits}</td>
                            <td>{g.homeRuns}</td>
                            <td>{g.rbi}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Last3HittingGames;
