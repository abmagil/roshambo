import { MOVES } from "./Moves.mjs";
export class Player {
  score;
  
  constructor(name) {
    this.name = name
    this.score = 0;
  }

  scoreAPoint() {
    this.score = this.score + 1;
  }

  async selectMove(previousMove) {
    throw new Error("Must override this method")
  }

  toString() {
    return this.name;
  }
}

export class AlwaysRock extends Player {
  async selectMove(previousMove) {
    return MOVES.R;
  }
}

export class AlwaysScissors extends Player {
  async selectMove(previousMove) {
    return MOVES.S;
  }
}

export class AlwaysPaper extends Player {
  async selectMove(previousMove) {
    return MOVES.P;
  }
}
