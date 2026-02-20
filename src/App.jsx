import Board from './components/Board';
import ScoreBoard from './components/Scoreboard';
import styles from './App.module.css';

// Main App component
export default function App() { 
  return (
      <div className = {styles.app}>
        <h1 className = {styles.h1}>Tic Tac Toe</h1> 
        <ScoreBoard />
        <Board />
      </div>
  )
}
