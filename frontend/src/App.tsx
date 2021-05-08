import React, { useState } from "react";
import Game from "./components/Game/Game";
import HomePage from "./components/HomePage/HomePage";
import { GameStatus } from "./interfaces/game";

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.HOME);
  return (
    <>
      {gameStatus === GameStatus.HOME ? (
        <HomePage onStart={() => setGameStatus(GameStatus.INGAME)} />
      ) : (
        <Game />
      )}
    </>
  );
}

export default App;
