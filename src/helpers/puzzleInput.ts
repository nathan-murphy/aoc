import { readFileSync } from "fs";

export function puzzleInput(path: string) {
    return readFileSync(path, { encoding: 'utf-8', flag: 'r' })
}

export function puzzleInputAsLines(path: string) {
    return puzzleInput(path).split('\n')
}