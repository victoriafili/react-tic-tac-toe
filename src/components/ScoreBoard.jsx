import { useSelector } from "react-redux"

function ScoreBoard() {
    const score = useSelector(state => state.score)

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                marginBottom: 30,
                marginTop: 20,
                padding: "10px 20px",
                borderRadius: 10,
                border: "2px solid white"
            }}
        >
            {/* Player X */}
            <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "white", margin: 0 }}>Player X</h4>
                <p style={{ color: "white", fontSize: 20, margin: 0 }}>{score.X}</p>
            </div>

            {/* Divider */}
            <div
                style={{
                    width: 2,
                    backgroundColor: "white",
                    height: 40, // length of the line
                }}
            >
            </div>

            {/* Player O */}
            <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "white", margin: 0 }}>Player O</h4>
                <p style={{ color: "white", fontSize: 20, margin: 0 }}>{score.O}</p>
            </div>
        </div>
    )
}

export default ScoreBoard