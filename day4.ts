const _EXAMPLE_INPUT = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
  
const _INPUT = await Deno.readTextFile('./day4-input.txt');
  
// We usually want to split each line of the raw input into an array for iteration.
// Switch which input is commented out once your code works with the example.
// const _input = _EXAMPLE_INPUT.trim().split('\n').map((pair) => pair.split(','));
const _input = _INPUT.trim().split('\n').map((pair) => pair.split(','));


// Utils
function _range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}


// Part One

// Your solution code here.
function expandRange(str: string) {
  // str = "2-6"
  const [a, b] = str.split('-').map((n) => parseInt(n));
  return _range(a, b, 1)
}


function isSubset(a: number[], b: number[]): boolean {
  if (a[0] <= b[0] && a.at(-1)! >= b.at(-1)!) {
    return true;
  } else if (b[0] <= a[0] && b.at(-1)! >= a.at(-1)!) {
    return true;
  } else {
    return false;
  }
}

function isOverlaping(a: number[], b: number[]): boolean {
  for (const n of a) {
    if (b.includes(n)) {
      return true;
    }
  }
  return false;
}


// [ "2-4", "6-8" ]
const pairs = _input.map(([a, b]) => [expandRange(a), expandRange(b)]);
const answerOne = pairs.filter(([a, b]) => isSubset(a, b)).length;


console.log('Part One:');
console.log(answerOne);

// Part Two

// Your solution code here.
const answerTwo = pairs.filter(([a, b]) => isOverlaping(a, b)).length;


console.log('Part Two:');
console.log(answerTwo);
