import { Fade } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Game from './components/Game/Game';
import HomePage from './components/HomePage/HomePage';
import httpUrls from './constants';
import { Exercise, GameStatus } from './interfaces';

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.HOME);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Get all exercises at start
  useEffect(() => {
    axios.get<Exercise[]>(`${httpUrls.getExercices}`).then((res) => {
      if (res.status === 200) {
        setExercises(res.data);
      }
    });
  }, []);

  return (
    <>
      {gameStatus === GameStatus.HOME ? (
        <HomePage onStart={() => setGameStatus(GameStatus.INGAME)} />
      ) : (
        <Fade in={gameStatus === GameStatus.INGAME}>
          <Game exercises={[exercises[0]]} setGameStatus={setGameStatus} />
        </Fade>
      )}
    </>
  );
}

export default App;
