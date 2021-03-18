import { Round } from "./Round.mjs";

export class Game {
  playerScores;
  numRounds;
  /**
   * 
   * @param players {Player[]}
   * @param numRounds {number}
   */
  constructor(players, numRounds = 1) {
    this.numRounds = numRounds;
    this.playerScores = players.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.name]: {
          score: 0,
          player: cur
        }
      }
    }, {})
  }

  get players() {
    return Object.values(this.playerScores).map(playerAndScore => playerAndScore.player)
  }

  /**
   * @returns {Player}
   */
  get winner() {
    const playersAndScores = Object.values(this.playerScores);
    playersAndScores.sort((a, b) => {
      return a.score > b.score;
    });
    return playersAndScores[0].player;
  }

  async play() {
    console.log(`Playing a game with ${this.players[0]} (${this.players[0].constructor.name}) and ${this.players[1]} (${this.players[0].constructor.name}`)
    let playedRounds = 0;
    while (playedRounds < this.numRounds) {
      const round = new Round(this.players, 3);
      const roundWinner = await round.play();
      console.log(`${roundWinner.toString()} has won this round`)
      this.playerScores[roundWinner.name].score = this.playerScores[roundWinner.name].score + 1;
      playedRounds = playedRounds + 1;
    }
    console.log(`${this.winner.toString()} has won this game`);
    return this.winner;
  }

}
