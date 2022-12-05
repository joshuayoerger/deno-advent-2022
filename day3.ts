const _EXAMPLE_INPUT = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const _INPUT = await Deno.readTextFile("./day3-input.txt");

// Utils
function _range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}

function halveString(str: string): string[] {
  const middle = str.length / 2;
  return [str.slice(0, middle), str.slice(middle)];
}

// Input
// const rucksacks = _EXAMPLE_INPUT.trim().split("\n");
const rucksacks = _INPUT.trim().split("\n");

// Create priotity lookup map
const alphaLower = "abcdefghijklmnopqrstuvwxyz".split("");
const alphaUpper = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

const items: string[] = alphaLower.concat(alphaUpper);

// const priorities = [...Array(53).keys().slice(1)];
// const values = range(1, 52, 1);

const priorities = new Map(
  Array.from(items.entries()).map(([i, v]) => [v, i + 1]),
);

// Part One

// Given Part Two, the intersection logic should be pulled into a function that
// accepts any number of sets.
const answerOne = rucksacks.map((sack) => halveString(sack))
  .map(([c1, c2]) =>
    [...new Set(c1.split(""))].filter((char) => c2.includes(char))
  )
  .flat()
  .map((item) => priorities.get(item)!)
  .reduce((acc, cur) => acc + cur, 0);

// Display Answer
console.log("Part One: " + answerOne);

// Part Two

//Partition input by threes
function partition<T>(arr: T[], step: number): T[][] {
  const _indices = [...arr.keys()].filter((key) => key % step === 0);
  // console.log(_indices)

  const partitioned: T[][] = [];
  for (const i of _indices) {
    if (i === 0) {
      partitioned.push(arr.slice(0, 0 + step));
    } else {
      partitioned.push(arr.slice(i, i + step));
    }
    // console.log(partitioned);
  }

  // console.log(partitioned);
  return partitioned;
}

const answerTwo = partition(rucksacks, 3).map(([c1, c2, c3]) =>
  [...new Set(c1.split(""))].filter((char) =>
    c2.includes(char) && c3.includes(char)
  )
)
  .flat()
  .map((item) => priorities.get(item)!)
  .reduce((acc, cur) => acc + cur, 0);

// Display Answer
console.log(answerTwo);
