import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";

const lines: string[] = puzzleInputAsLines(
  "C:\\dev\\aoc\\src\\2023\\day\\9\\input.txt"
);
let puzzleInput: Record<number, number[]> = {};
lines.forEach((line, index) => {
  puzzleInput[index] = [];
  line.split(" ").forEach((m) => puzzleInput[index].push(Number(m)));
});

let total: number = 0;
let totalpt2: number = 0;
for (let i in puzzleInput) {
  let next = findDeltas(puzzleInput[i]);
  let prev = findDeltas(puzzleInput[i].reverse());
  total += next[next.length - 1];
  totalpt2 += prev[prev.length - 1];
}

console.log(total);
console.log(totalpt2);

function findDeltas(pattern: number[]) {
  if (pattern.filter((n) => n == 0).length == pattern.length) return pattern;
  let deltas: number[] = [];
  pattern.forEach((n, i) => {
    if (!i) return;
    deltas.push(n - pattern[i - 1]);
  });
  let nextLevelDown: number[] = findDeltas(deltas);
  pattern.push(
    pattern[pattern.length - 1] + nextLevelDown[nextLevelDown.length - 1]
  );
  return pattern;
}
