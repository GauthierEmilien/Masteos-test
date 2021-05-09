import { Exercise } from "./exercise";

export enum GameStatus {
  INGAME = "ingame",
  HOME = "home",
}

export interface GameProps {
  exercises: Exercise[];
}
