import { readFileSync } from "fs";
export function puzzleInput(path) {
    return readFileSync(path, { encoding: 'utf-8', flag: 'r' });
}
export function puzzleInputAsLines(path) {
    return puzzleInput(path).split('\n');
}
