import ConsoleStream from "console-stream";
import { comparator } from "./Moves.mjs";

export class Game {
  players;
  winNumber;

  constructor(players, winNumber = 2) {
    this.players = players;
    this.winNumber = winNumber;
    this.stream = new ConsoleStream();
  }

  get winner() {
    return this.players.find(player => player.score >= this.winNumber);
  }

  async play() {
    let lastMoves = [];
    while (!(this.winner)) {
      const moves = await gatherMoves(this.players, lastMoves);
      lastMoves = moves;
      scoreMoves(moves, this.playerScores);
      this.stream.write(`${moves[0].selection}|${moves[1].selection}`)
    }
    console.log(`${this.winner.toString()} has won`)
    return this.winner;
  }
}

async function gatherMoves(players, previousMoves) {
  return Promise.all(
    players.map(async (player) => {
      const otherPlayerMoves = previousMoves.filter(playerMove => playerMove.player.name === player.name);
      const playerSelection = await player.selectMove(otherPlayerMoves);
      return {
        selection: playerSelection,
        player: player,
      }
    })
  )
}

function scoreMoves(moves, scores) {
  if (comparator(moves[0].selection, moves[1].selection) > 0) {
    moves[0].player.scoreAPoint();
  }
  if (comparator(moves[0].selection, moves[1].selection) < 0) {
    moves[1].player.scoreAPoint();
  }
}
