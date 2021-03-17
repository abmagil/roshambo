import { Game } from "./Game.mjs";
import { AlwaysScissors } from "./Player.mjs";
import { AlwaysRock } from "./Player.mjs";

const g = new Game([
  new AlwaysRock("rockman"),
  new AlwaysScissors("rackman")
])
g.play();
