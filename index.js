import { Game }from "./Game.mjs";
import { Round } from "./Round.mjs";
import { 
  AlwaysRock,
  AlwaysPaper,
  AlwaysScissors,
  Mirror,
  BeatPrevious } from "./Player.mjs";
import { randomFromArray } from "./randomFromArray.mjs";

const PLAYER_TYPES = [
  AlwaysRock,
  AlwaysPaper,
  AlwaysScissors,
  Mirror,
  BeatPrevious
];

const selectRandomPlayer = (name) => {
  const PlayerType = randomFromArray(PLAYER_TYPES);
  return new PlayerType(name);
}

const g = new Game([
  selectRandomPlayer("Player 1"),
  selectRandomPlayer("Player 2"),
], 5)
g.play();
