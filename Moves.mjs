export const MOVES = { R:"R", P:"P", S:"S" };
export function comparator(moveA, moveB) {
  if (!(MOVES[moveA]) || !(MOVES[moveB])) {
    throw new Error("both moves must be supported");
  }
  
  switch (moveA) {
    case "R":
      switch (moveB) {
        case "R":
          return 0;
        case "P":
          return -1;
        case "S":
          return 1
        default:
          break;
      }
    case "P":
      switch (moveB) {
        case "R":
          return 1;
        case "P":
          return 0;
        case "S":
          return -1
        default:
          break;
      }
    case "S":
      switch (moveB) {
        case "R":
          return -1;
        case "P":
          return 1;
        case "S":
          return 0
        default:
          break;
      }
    default:
      break;
  }
}

