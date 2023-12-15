import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";
import { Grid, StringGrid } from "../../../helpers/grid/grid.js";
import { inspect } from "util";

const lines = puzzleInputAsLines('C:\\dev\\aoc\\src\\2023\\day\\14\\input.txt')
const dirs = ['north', 'west', 'south', 'east']
const dirFuncs: Record<string, Function> = {
    'north': StringGrid.prototype.addStringColumnToEnd
}


const sg = new StringGrid();
lines.forEach(line => sg.addStringRowToBottom(line.trimEnd()))


let newGrid: StringGrid;
newGrid = tilt(sg, dirs[0])

let weight = calcWeight(newGrid)

console.log(weight)


function tilt(g: StringGrid, direction: string): StringGrid {
    console.time();
    const tiltedGrid = new StringGrid();
    for (let i of g.stringCols()) {
        let tilted: string = i.split('#').map(s => moveRoundRocks(s)).join('#')
        dirFuncs[direction].call(tiltedGrid, tilted)
    }

    console.timeEnd();
    return tiltedGrid;
}

function calcWeight(g: StringGrid) {
    let rowWeightFactor = 1;
    let overallWeight = 0;
    for (let row = g.numRows() - 1; row >= 0; row--) {
        let numRocksInRow = ([...g.getStringRow(row).matchAll(/O/g)].length)
        overallWeight += numRocksInRow * rowWeightFactor++
    }
    return overallWeight;
}

function moveRoundRocks(s: string) {
    let numRoundRocks = [...s].filter(c => c == 'O').length
    let rocks = 'O'.repeat(numRoundRocks)
    let blanks = '.'.repeat(s.length - numRoundRocks)
    return rocks + blanks;
}
