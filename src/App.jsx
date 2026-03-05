import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import { assignPlayer } from './multiplayer/playerManager';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// Main App component
export default function App() { 
  const [currPlayer] = useState(assignPlayer());

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  
  return (
    <div className = {styles.app}>
      <h1 className = {styles.h1}>Tic Tac Toe</h1> 
      <p>You are Player: {currPlayer}</p>
      <ScoreBoard state={state}/>
      <Board dispatch={dispatch} state={state} currPlayer={currPlayer} />
    </div>
  )
}
