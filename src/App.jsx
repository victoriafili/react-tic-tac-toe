import Board from './components/Board';
import ScoreBoard from './components/Scoreboard';

// Main App component
export default function App() { 
  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', width: '100vw' }}>
        <h1 style={{ marginTop: 0, marginBottom: 10 }}>Tic Tac Toe</h1> 
        <ScoreBoard />
        <Board />
      </div>
  )
}
