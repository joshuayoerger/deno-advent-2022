const _EXAMPLE_INPUT = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const _INPUT = await Deno.readTextFile("./day1-input.txt");

// Helpers
// function sum(arr: number[]) {
//   return arr.reduce((acc, cur) => acc + cur, 0);
// }

function prepareInput (input: string): number[][] {
  const groups: number[][] = [];
  let acc: number[] = [];
  
  for (const line of input.split('\n')) {
    if (line === '') {
      groups.push(acc);
      acc = [];
    } else {
      acc.push(parseInt(line));
    }
  }

  return groups;
}

// Part 1
// const elves: number[][] = prepareInput(_INPUT);
const elves = prepareInput(_EXAMPLE_INPUT);
const sums: number[] = elves.map((elf) => elf.reduce((acc, cur) => acc + cur, 0));

const answerOne = Math.max(...sums);
console.log('Part One: ' + answerOne);

// Part Two
const answerTwo = sums.sort((a, b) => b - a)
                      .slice(0, 3)
                      .reduce((acc, cur) => acc + cur, 0);                    
console.log('Part Two: ' + answerTwo);