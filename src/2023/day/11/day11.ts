import { inspect } from "util";
import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";
import Graph from "graphology";
import { bidirectional } from 'graphology-shortest-path';



const lines = puzzleInputAsLines("C:\\dev\\aoc\\src\\2023\\day\\11\\sample.txt");


let input: string[][] = []
lines.forEach((line, i) => input[i] = [...line.trimEnd()])
input = expandRows(input)
input = transpose(input)
input = expandRows(input)
input = transpose(input)


const g = buildGraphFromInput(input)
// console.log(inspect(g))
const pairs = findGalaxyPairs(g)
// console.log(pairs.length, inspect(pairs))

// let total = 0;
// for (const pair of pairs) {
//     total += bidirectional(g, pair.source, pair.target).length - 1
// }
// console.log(total)

console.log(inspect(pairs))


function transpose(matrix: string[][]) {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function expandRows(matrix: string[][]) {
    //look for rows with no galaxies
    let indicesToExpand: number[] = []
    for (let row = 0; row < matrix.length; row++) {
        let numGalaxies = matrix[row].filter(char => char == '#').length
        if (numGalaxies == 0)
            indicesToExpand.unshift(row)
    }

    //expand empty ones
    for (let expansion = 0; expansion < 1e6; expansion++) {
        for (let rowIndex of indicesToExpand) {
            let emptyLine = [...matrix[rowIndex]]
            matrix.splice(rowIndex, 0, emptyLine)
        }
    }

    return matrix;
}
function buildGraphFromInput(input: string[][]) {
    let g = new Graph.UndirectedGraph();
    let galaxyNumber = 1;
    input.forEach((row, y) => {
        row.forEach((char, x) => {
            let n = g.addNode(`${x}, ${y}`, { x: x, y: y, sym: char })
            if (char == '#') {
                g.setNodeAttribute(n, 'galaxyNumber', galaxyNumber)
                galaxyNumber++
            }
        })
    })
    input.forEach((row, y) => {
        row.forEach((_, x) => {
            if (x != row.length - 1)
                g.addEdge(`${x}, ${y}`, `${x + 1}, ${y}`)
            if (y != input.length - 1)
                g.addEdge(`${x}, ${y}`, `${x}, ${y + 1}`)
        })
    })
    return g;
}

function findGalaxyPairs(g: Graph.UndirectedGraph) {
    let nodes = g.filterNodes((node, attr) => {
        return (attr['galaxyNumber'] > 0)
    })

    let nodePairs: { source: string, target: string }[] = [];
    nodes.forEach((node, index) => {
        for (let i = index + 1; i < nodes.length; i++) {
            nodePairs.push({
                'source': node,
                'target': nodes[i]
            })
        }
    })
    // console.log(inspect(nodePairs))
    return nodePairs
}

