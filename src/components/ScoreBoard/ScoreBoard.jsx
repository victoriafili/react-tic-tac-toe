import styles from "./Scoreboard.module.css"

function ScoreBoard({state}) {
    const score = state.score;
    return (
        <div className={styles.scoreBoard}>
            {/* Player X */}
            <div className={styles.playerBox}>
                <h4 className={styles.playerX}>Player X</h4>
                <p className={styles.playerXScore}>{score.X}</p>
            </div>

            {/* Divider */}
            <div className={styles.scoreBoardDivider}></div>

            {/* Player O */}
            <div className={styles.playerBox}>
                <h4 className={styles.playerO}>Player O</h4>
                <p className={styles.playerOScore}>{score.O}</p>
            </div>
        </div>
    )
}

export default ScoreBoard