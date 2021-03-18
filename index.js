import { Game } from "./Game.mjs";
import { AlwaysRock, AlwaysPaper, AlwaysScissors } from "./Player.mjs";

const selectRandomPlayer = (name) => {
  const pick = Math.random();
  if (pick <= 0.33) {
    return new AlwaysPaper(name);
  } else if (pick <= 0.66) {
    return new AlwaysRock(name);
  } else {
    return new AlwaysScissors(name);
  }
}

const g = new Game([
  selectRandomPlayer("Player 1"),
  selectRandomPlayer("Player 2"),
])
g.play();
