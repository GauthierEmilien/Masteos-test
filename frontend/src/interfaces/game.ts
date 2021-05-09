import { Dispatch, SetStateAction } from 'react';
import { Exercise } from './exercise';

export enum GameStatus {
  INGAME = 'ingame',
  HOME = 'home',
}

export interface GameProps {
  exercises: Exercise[];
  setGameStatus: Dispatch<SetStateAction<GameStatus>>;
}
