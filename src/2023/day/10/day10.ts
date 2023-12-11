import { puzzleInput } from "../../../helpers/puzzleInput.js";
import Graph from "graphology";
import { bfsFromNode, dfsFromNode } from 'graphology-traversal';
import { inspect } from "util";


let g = new Graph.UndirectedGraph()

let txt = puzzleInput("C:\\dev\\aoc\\src\\2023\\day\\10\\input.txt");
const width = txt.indexOf("\r\n");
txt = txt.replaceAll("\r\n", "");
const height = txt.length / width;

const valid: Record<string, string[]> = {
  'left': ["-", "L", "F"],
  'right': ["-", "7", "J"],
  'up': ["|", "7", "F"],
  'down': ["|", "J", "L"],
}

const dirs: Record<string, Function[]> = {
  '-': [left, right],
  '|': [up, down],
  'L': [up, right],
  'F': [right, down],
  '7': [down, left],
  'J': [left, up],
  '.': [],
  'S': [left, up, down, right]
}

txt.split('').map((sym, i) => g.addNode(getXYFromI(i), { char: sym, x: JSON.parse(getXYFromI(i))['x'], y: JSON.parse(getXYFromI(i))['y'] }))

for (const n of g.nodes()) {
  const source = JSON.parse(n)
  const pipe: string = g.getNodeAttribute(n, 'char')

  dirs[pipe].forEach(f => {
    const target: { x: number, y: number } = f(source)
    if (target != undefined) {
      const m = JSON.stringify(target)
      const targetChar = g.getNodeAttribute(m, 'char')
      if (valid[f.name].indexOf(targetChar) >= 0 && !g.hasEdge(n, m))
        g.addEdge(n, m)
    }
  })
}

const sLoc = getXYFromI(txt.indexOf('S'));
const sLocAttr = g.getNodeAttributes(sLoc)
let prevNode: { x: number, y: number } = { x: null, y: null };
let area = 0;
let b = 0;
let nodesBfs = 0;

bfsFromNode(g, sLoc, (node, attr, depth) => {
  nodesBfs = Math.max(depth, nodesBfs)
});
// console.log("bfs:", nodesBfs)

// starts on S, ends on the last pipe
dfsFromNode(g, sLoc, (node, attr) => {
  b++
  if (prevNode.x != null) {
    // shoelace formula
    let val = (prevNode.x * attr.y) - (attr.x * prevNode.y);
    area += val;
  }
  prevNode.x = attr.x;
  prevNode.y = attr.y;
})
console.log('boundary points (b):', b)

// include the S again to make a whole polygon
let val = (prevNode.x * sLocAttr.y) - (sLocAttr.x * prevNode.y);
area += val
area = Math.abs(area) / 2
console.log("area:", area)

// Pick's theorem
// A = i + (b/2) - 1
// area = i + (b/2) - 1
// i = area - (b/2) - 1
console.log("interior points:", area - (b / 2) + 1)

function getXYFromI(i: number) {
  return JSON.stringify({ x: i % width, y: Math.floor(i / width) })
}

function left(p: { x: number; y: number }) {
  if (p.x != 0) return { x: p.x - 1, y: p.y };
  else return undefined;
}
function right(p: { x: number; y: number }) {
  if (p.x != width - 1) return { x: p.x + 1, y: p.y };
  else return undefined;
}
function up(p: { x: number; y: number }) {
  if (p.y != 0) return { x: p.x, y: p.y - 1 };
  else return undefined;
}
function down(p: { x: number; y: number }) {
  if (p.y != height - 1) return { x: p.x, y: p.y + 1 };
  else return undefined;
}
