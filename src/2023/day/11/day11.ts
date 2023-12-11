import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";
import Graph from "graphology";
import { bfsFromNode, dfsFromNode } from 'graphology-traversal';
import { inspect } from "util";

// function getXYFromI(i: number) {
//     return { x: i % width, y: Math.floor(i / width) }
// }

// function left(p: { x: number; y: number }) {
//     if (p.x != 0) return { x: p.x - 1, y: p.y };
//     else return undefined;
// }
// function right(p: { x: number; y: number }) {
//     if (p.x != width - 1) return { x: p.x + 1, y: p.y };
//     else return undefined;
// }
// function up(p: { x: number; y: number }) {
//     if (p.y != 0) return { x: p.x, y: p.y - 1 };
//     else return undefined;
// }
// function down(p: { x: number; y: number }) {
//     if (p.y != height - 1) return { x: p.x, y: p.y + 1 };
//     else return undefined;
// }


let txt = puzzleInputAsLines("C:\\dev\\aoc\\src\\2023\\day\\11\\sample.txt");

let expandedTxt: string[] = []
let numExpanded = 0;
txt.forEach((line, i) => {
    expandedTxt[i + numExpanded] = line
    if ([...line.trimEnd()].filter(char => char != '.').length == 0) {
        expandedTxt.splice(i + numExpanded, 0, line)
        numExpanded++
    }
})
for (const col in [...txt[0]]) {
    txt.every((line, row) => {
        if (line[col] != '.') {
            return false
        }
    })
}
console.log(expandedTxt)

// const width = txt.indexOf("\r\n");
// txt = txt.replaceAll("\r\n", "");
// const height = txt.length / width;

// let g = new Graph.UndirectedGraph();

// const around = [left, right, up, down]


// txt.split('').map((sym, i) => {
//     let xy = getXYFromI(i);
//     g.addNode(JSON.stringify(xy), { char: sym, x: xy.x, y: xy.y });
// })

// for (const n of g.nodes()) {
//     const source = JSON.parse(n)
//     const isGalaxy: boolean = (g.getNodeAttribute(n, 'char') == '#')

//     around.forEach(f => {
//         const neighbor: { x: number, y: number } = f(source)
//         if (neighbor != undefined) {
//             const m = JSON.stringify(neighbor)
//             const targetChar = g.getNodeAttribute(m, 'char')
//             if (!g.hasEdge(n, m))
//                 g.addEdge(n, m)
//         }
//     })
// }



// console.log(inspect(g))
