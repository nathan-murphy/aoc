import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";
import { Grid, StringGrid } from "../../../helpers/grid/grid.js";
import { inspect } from "util";

const lines = puzzleInputAsLines('C:\\dev\\aoc\\src\\2023\\day\\14\\input.txt')
const dirs = ['north', 'west', 'south', 'east']
const dirFuncs: Record<string, Function> = {
    'north': StringGrid.prototype.addStringColumnToEnd,
    'west': StringGrid.prototype.addStringRowToBottom,
    'south': StringGrid.prototype.addStringColumnToEnd,
    'east': StringGrid.prototype.addStringRowToBottom,
}

const sg = new StringGrid();
lines.forEach(line => sg.addStringRowToBottom(line.trimEnd()))

let cycleDetector: Record<string, {'iteration': number, 'weight': number}> = {}
let iterationTracker: Record<number, number> = {}
let repeatsOn = runCycle(sg, 1000000000);
let finalWeight = iterationTracker[repeatsOn]
console.log(inspect(finalWeight))

function runCycle(start: StringGrid, numCycles: number = 1000000000) {
    let next: StringGrid = start;
    for(let i = 0; i < numCycles; i++) {
        dirs.forEach((dir: string) => next = tilt(next, dir))
        let key = next.stringRowsAsString();

        // if encountering a new configuration of stones ...
        if(cycleDetector[key] == undefined) {
            
            //calculate and store the weight ...
            let weight = calcWeight(next);

            cycleDetector[key] = {'iteration': i+1, 'weight': weight}
            iterationTracker[i+1] = weight
        }
        // if this configuration has been seen before, it will play out exactly as before
        else {
            let weight = calcWeight(next);
            iterationTracker[i+1] = weight
            let startPattern = cycleDetector[key].iteration-1;
            let endPattern = i
            let patternLength = endPattern - startPattern
            let offset = startPattern
            let iterationEndsOn = (numCycles - offset) % patternLength
            return iterationEndsOn
        }
    }
}

function tilt(grid: StringGrid, direction: string): StringGrid {
    // console.time();
    const tiltedGrid = new StringGrid();
    let rowOrCol: string[] = []
    switch (direction) {
        case 'north':
        case 'south':
            rowOrCol = grid.stringCols()
            break;
        case 'west':
        case 'east':
            rowOrCol = grid.stringRows()
            break;
        default:
            break;
    }
    for (let i of rowOrCol) {
        let tilted: string = i.split('#').map(s => moveRoundRocks(s, direction)).join('#')
        dirFuncs[direction].call(tiltedGrid, tilted)
    }
    // console.timeEnd();
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

function moveRoundRocks(s: string, direction: string) {
    let numRoundRocks = [...s].filter(c => c == 'O').length
    let rocks = 'O'.repeat(numRoundRocks)
    let blanks = '.'.repeat(s.length - numRoundRocks)
    switch (direction) {
        case 'north':
        case 'west':
            return rocks + blanks
        case 'south':
        case 'east':
            return blanks + rocks
        default:
            return
    }
}
