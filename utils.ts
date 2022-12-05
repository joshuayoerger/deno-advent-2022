export function prepareInput (input: string): number[][] {
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