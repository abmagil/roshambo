import { comparator } from "./Moves.mjs";

export class Round {
  playerScores; // { [playerName: string]: { score: number, player: Player }}
  winNumber; // number

  /**
   * 
   * @param players {Player[]}
   * @param winNumber {number}
   */
  constructor(players, winNumber = 1) {
    this.playerScores = players.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.name]: {
          score: 0,
          player: cur
        }
      }
    }, {})
    this.winNumber = winNumber;
  }

  /**
   * @returns {Player}
   */
  get winner() {
    return Object.values(this.playerScores)
      .find(playerScore => playerScore.score >= this.winNumber)?.player;
  }

  get players() {
    return Object.values(this.playerScores).map(playerAndScore => playerAndScore.player)
  }

  /**
   * @returns {Player}
   */
  async play() {
    let lastMoves = [];
    while (!(this.winner)) {
      const moves = await gatherMoves(this.players, lastMoves);
      lastMoves = moves;
      scoreMoves(moves, this.playerScores);
      console.log(`${moves[0].selection} | ${moves[1].selection}`)
    }
    return this.winner;
  }
}

/**
 * 
 * @param players {Player[]}
 * @param previousMoves {PlayerAndSelection[]}
 * @returns {PlayerAndSelection[]}
 */
async function gatherMoves(players, previousMoves) {
  return Promise.all(
    players.map(async (player) => {
      const otherPlayerMoves = previousMoves.filter(playerMove => playerMove.player.name !== player.name)[0];
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
    const playerName = moves[0].player.name;
    scores[playerName].score = scores[playerName].score + 1;
  }
  if (comparator(moves[0].selection, moves[1].selection) < 0) {
    const playerName = moves[1].player.name;
    scores[playerName].score = scores[playerName].score + 1;
  }
}
