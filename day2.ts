const _EXAMPLE_INPUT = `A Y
B X
C Z`;

const _INPUT = await Deno.readTextFile("./day2-input.txt");

// type Moves = 'Rock' | 'Paper' | 'Scissors';
type AwayMove = "A" | "B" | "C";
type HomeMove = "X" | "Y" | "Z";

type Game = `${AwayMove}.${HomeMove}`;

function scoreGame(game: Game): number {
  // Scoring Key:
  // Rock: 1
  // Paper: 2
  // Scissors: 3
  // Win: 6
  // Draw: 3
  // Lose: 0

  switch (game) {
    // Losses
    case "B.X":
      return 1;
    case "C.Y":
      return 2;
    case "A.Z":
      return 3;
    // Draws
    case "A.X":
      return 4;
    case "B.Y":
      return 5;
    case "C.Z":
      return 6;
    // Wins
    case "C.X":
      return 7;
    case "A.Y":
      return 8;
    case "B.Z":
      return 9;
  }
}

// PartOne
const games = <Array<Game>> _INPUT.trim()
  .split("\n")
  .flatMap((game) => game.split(" ").join("."));

const scoreOne = games.map((game) => scoreGame(game))
  .reduce((acc, cur) => acc + cur, 0);

console.log("Part One: " + scoreOne);

//PartTwo
// Outcome Key:
// X: Lose
// Y: Draw
// Z: Win

function pickMove(game: Game): Game {
  switch (game) {
    // Need to Lose
    case "A.X":
      return "A.Z";
    case "B.X":
      return "B.X";
    case "C.X":
      return "C.Y";
    // Need to Draw
    case "A.Y":
      return "A.X";
    case "B.Y":
      return "B.Y";
    case "C.Y":
      return "C.Z";
    // Need to Win
    case "A.Z":
      return "A.Y";
    case "B.Z":
      return "B.Z";
    case "C.Z":
      return "C.X";
  }
}

const scoreTwo = games.map((game) => pickMove(game))
  .map((game) => scoreGame(game))
  .reduce((acc, cur) => acc + cur, 0);

console.log("Part Two: " + scoreTwo);
