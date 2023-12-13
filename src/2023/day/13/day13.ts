import { puzzleInput } from "../../../helpers/puzzleInput.js";
import { transposeArrayOfStrings } from "../../../helpers/transpose.js";

let allMapsOneString = puzzleInput("C:\\dev\\aoc\\src\\2023\\day\\13\\input.txt")

let allMaps = allMapsOneString.split('\r\n\r\n')
let total = 0;
console.time()
for (const mapIndex in allMaps) {

    const rows = allMaps[mapIndex].split('\r\n')
    const initialRowReflectionIndex = findReflectionIndex(rows, -1);
    const initCols = transposeArrayOfStrings(rows)
    const initialColReflectionIndex = findReflectionIndex(initCols, -1);

    for (let smudgeIndex = 0; smudgeIndex < rows[0].length * rows.length; smudgeIndex++) {

        let col = smudgeIndex % rows[0].length;
        let row = Math.floor(smudgeIndex / rows[0].length)
        const newChar = rows[row].charAt(col) == '.' ? '#' : '.'

        let start: string = ''
        let end: string = ''
        if (col == 0) {
            start = newChar
            end = rows[row].substring(1)
        } else {
            start = rows[row].substring(0, col) + newChar
            end = rows[row].substring(col + 1)
        }

        const replacementRow = start + end
        let replacedRows = [...rows]
        replacedRows[row] = replacementRow;

        const rowReflectionIndex = findReflectionIndex(replacedRows, initialRowReflectionIndex);
        if (rowReflectionIndex != null) {
            console.log(`reflects across row ${rowReflectionIndex}`)
            total += rowReflectionIndex * 100
            break;

        } else {
            const cols = transposeArrayOfStrings(replacedRows)
            const colReflectionIndex = findReflectionIndex(cols, initialColReflectionIndex);
            if (colReflectionIndex != null) {
                console.log(`reflects across col ${colReflectionIndex}`)
                total += colReflectionIndex
                break;
            }
        }
    }
}
console.timeEnd()
console.log(total)

function findReflectionIndex(rows: string[], exceptIfIndexIs: number): number {
    for (let i = 0; i < rows.length - 1; i++) {
        if (testIsMirrored(rows, i) && i + 1 != exceptIfIndexIs)
            return i + 1;
    }
    return null;
}

function testIsMirrored(rows: string[], i: number): boolean {
    let top = i
    let bottom = i + 1
    let mirrored = false

    while (rows[top--] == rows[bottom++])
        if (top < 0 || bottom == rows.length)
            mirrored = true

    return mirrored
}