import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";

class Day12 {
    isValidRow(row: string, codes: number[]): boolean {
        let numBrokenInRow = [...row.matchAll(/#/g)].length
        let numShouldBeBroken = 0;
        codes.forEach(code => numShouldBeBroken += code)
        if (numBrokenInRow != numShouldBeBroken)
            return false

        let codeMatch: string[] = [];
        codes.forEach(code => codeMatch.push("#{" + code + "}"))
        let re = codeMatch.join("\\.+")
        let regex = new RegExp(`${re}`, 'g')
        let match = row.match(regex)
        return match != null
    }

    findAllPossibleRows(row: string) {
        const matches = [...row.matchAll(/\?/g)];
        const numUnknowns = matches.length;

        let possibleRows: string[] = []
        for (let i = 0; i < (1 << numUnknowns); i++) {
            const binary = i.toString(2).padStart(numUnknowns, '0')

            let option: string = '';
            for (let j = 0; j < binary.length; j++)
                option += (binary[j] == '0') ? '.' : '#';

            let possibleRow: string = row;
            for (let k = 0; k < numUnknowns; k++)
                possibleRow = this.replaceAt(possibleRow, matches[k].index, option[k])

            possibleRows.push(possibleRow)
        }
        return possibleRows;
    }

    replaceAt(initial: string, index: number, replacement: string) {
        return initial.substring(0, index) + replacement + initial.substring(index + replacement.length);
    }
}

const lines = puzzleInputAsLines("C:\\dev\\aoc\\src\\2023\\day\\12\\sample.txt");
let total = 0;
let d = new Day12()
lines.forEach(line => {
    const row = line.split(' ')[0];
    const codes = line.split(' ')[1].split(',').map(n => Number(n))
    const validRows = d.findAllPossibleRows(row).filter(possibleRow => {
        return d.isValidRow(possibleRow, codes)
    })
    total += validRows.length
})
console.log(total)