import { MOVES } from "./Moves.mjs";
import { randomFromArray } from "./randomFromArray.mjs";
export class Player {
  constructor(name) {
    this.name = name
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

export class Mirror extends Player {
  async selectMove(previousMove) {
    return previousMove?.selection || (() => {
      const moves = Object.values(MOVES);
      return randomFromArray(moves)
    })();
  }
}

export class BeatPrevious extends Player {
  async selectMove(previousMove) {
    switch (previousMove?.selection) {
      case MOVES.R:
        return MOVES.P;
      case MOVES.P:
        return MOVES.S;
      case MOVES.S:
        return MOVES.R;       
      default:
        return randomFromArray(Object.values(MOVES))
    }
  }
}
