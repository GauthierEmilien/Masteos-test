import { Fade } from "@material-ui/core";
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
        <Fade in={gameStatus === GameStatus.INGAME}>
          <Game />
        </Fade>
      )}
    </>
  );
}

export default App;
