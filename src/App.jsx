import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import styles from './App.module.css';

import { useState, useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react';

const channel = new BroadcastChannel('tic-tac-toe');

// Main App component
export default function App() { 
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  // Post state to other tabs
  useEffect(() => {
    channel.postMessage(state);
  }, [state]);

  // Listen for messages from other tabs
  useEffect(() => {
    channel.onmessage = (event) => {
      dispatch({ type: "LOAD_STATE", payload: event.data });
    };
  }, [dispatch]);

  return (
    <div className = {styles.app}>
      <h1 className = {styles.h1}>Tic Tac Toe</h1> 
      <ScoreBoard />
      <Board />
    </div>
  )
}
