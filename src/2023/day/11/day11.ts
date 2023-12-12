import { inspect } from "util";
import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";
import Graph from "graphology";
import { bidirectional } from 'graphology-shortest-path';



const lines = puzzleInputAsLines("C:\\dev\\aoc\\src\\2023\\day\\11\\input.txt");


let input: string[][] = []
lines.forEach((line, i) => input[i] = [...line.trimEnd()])
let emptyRows = findEmptyRowsIn(input);
input = transpose(input)
let emptyCols = findEmptyRowsIn(input);
input = transpose(input)

const pairs = findGalaxyPairs(input)

// const g = buildGraphFromInput(input)
// console.log(inspect(g))
console.log(pairs.length, inspect(pairs))
// console.log(emptyCols, emptyRows)

let total = 0;
for (const pair of pairs) {
    total += distanceBetween(pair, emptyCols, emptyRows)
}
console.log(total)



function transpose(matrix: string[][]) {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function findEmptyRowsIn(matrix: string[][]) {
    //look for rows with no galaxies
    let indicesToExpand: number[] = []
    for (let row = 0; row < matrix.length; row++) {
        let numGalaxies = matrix[row].filter(char => char == '#').length
        if (numGalaxies == 0)
            indicesToExpand.push(row)
    }
    return indicesToExpand;
}

function findGalaxyPairs(input: string[][]) {
    let galaxies: { x: number, y: number }[] = []
    for (let y in input) {
        for (let x in input[y]) {
            if (input[y][x] == '#')
                galaxies.push({ 'x': Number(x), 'y': Number(y) })
        }
    }
    console.log(inspect(galaxies))

    let galaxyPairs: {
        source: {
            x: number,
            y: number
        },
        target: {
            x: number,
            y: number
        }
    }[] = [];
    galaxies.forEach((g, index) => {
        for (let i = index + 1; i < galaxies.length; i++) {
            galaxyPairs.push({
                'source': { 'x': g.x, 'y': g.y },
                'target': { 'x': galaxies[i].x, 'y': galaxies[i].y }
            })
        }
    })

    return galaxyPairs
}

function distanceBetween(pair: {
    source: {
        x: number;
        y: number;
    }; target: {
        x: number;
        y: number;
    };
}, emptyCols: number[], emptyRows: number[]): number {
    let yMin = Math.min(pair.source.y, pair.target.y);
    let yMax = Math.max(pair.source.y, pair.target.y);
    let xMin = Math.min(pair.source.x, pair.target.x);
    let xMax = Math.max(pair.source.x, pair.target.x);

    let distance = (yMax - yMin) + (xMax - xMin);

    //add expansion factor
    for (let x = xMin; x < xMax; x++) if (emptyCols.includes(x)) distance+=1e6-1;
    for (let y = yMin; y < yMax; y++) if (emptyRows.includes(y)) distance+=1e6-1;

    return distance;
}

