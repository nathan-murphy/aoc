import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";

class NodeMap {
    map: Record<string, Node> = {}

    findNodesEndingIn(letter: string): Node[] {
        let nodesEndingInA: Node[] = [];
        Object.keys(this.map).filter(k => k[2] == letter).forEach(id => nodesEndingInA.push(this.find(id)))
        return nodesEndingInA
    }

    find(id: string): Node {
        return this.map[id]
    }

    addNode(n: Node): Node {
        this.map[n.id] = n;
        return n;
    }

    leftFrom(n: Node): Node {
        return this.find(this.map[n.id].l)
    }

    rightFrom(n: Node): Node {
        return this.find(this.map[n.id].r)
    }

    from(n: Node, dir: string): Node {
        switch (dir) {
            case 'L':
                return this.leftFrom(n)
            case 'R':
                return this.rightFrom(n)
            default:
                console.log(dir)
                throw new Error("bad directions. you lost?")
        }
    }

    fromMany(n: Node[], dir: string): Node[] {
        let ret: Node[] = []
        n.forEach(i => ret.push(this.from(i, dir)))
        return ret;
    }
}

class NodeFactory {
    re: RegExp = new RegExp(/\w{3}/g)
    initNodeFromPuzzleInput(input: string) {
        let matches = [...input.matchAll(this.re)]
        return new Node(matches[0].toString(), matches[1].toString(), matches[2].toString())
    }
}

class Node {
    id: string
    l: string
    r: string

    constructor(id: string, l: string, r: string) {
        this.id = id;
        this.l = l;
        this.r = r;
    }
}

//-----//
let lines = puzzleInputAsLines('C:/dev/aoc23/src/2023/day/8/input.txt')
const directionLine: string = lines[0]
let dirs: string[] = [...directionLine];
dirs.splice(dirs.length - 1, 1)

const nm: NodeMap = new NodeMap();
const nf: NodeFactory = new NodeFactory();

console.time('building nodes');
lines.splice(0, 2);
for (const line in lines)
    nm.addNode(nf.initNodeFromPuzzleInput(lines[line]))
console.timeEnd('building nodes');

console.time('traversing')
const startingNodes: Node[] = nm.findNodesEndingIn('A');
let distanceToZ: number[] = [];

startingNodes.forEach((n, i) => {
    distanceToZ[i] = 0;
    let currNode: Node = n;
    let nextNode: Node;
    let lookingForEnd = true
    while (lookingForEnd) {
        dirs.forEach(d => {
            distanceToZ[i]++
            nextNode = nm.from(currNode, d)
            currNode = nextNode;
        })
        lookingForEnd = currNode.id[2] != 'Z'
    }
})
console.log(distanceToZ)
console.log(lcmArray(distanceToZ))


// Define a function to compute the GCD of two numbers using the Euclidean algorithm
function gcd(a: number, b: number): number {
    return a ? gcd(b % a, a) : b;
}

// Define a function to compute the LCM of two numbers using the formula
function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

// Define a function to compute the LCM of an array of values using reduce
function lcmArray(arr: number[]) {
    return arr.reduce(lcm);
}

// Test the function with an example array
console.log(lcmArray([1, 2, 3, 4, 5])); // => 60



// let steps: number = 0;
// const start: Node = nm.find('AAA');
// let currNode: Node = start;
// let nextNode: Node;
// while (true) {
//     dirs.forEach(d => {
//         steps++
//         nextNode = nm.from(currNode, d)
//         // console.log(currNode, d, nextNode)
//         currNode = nextNode;
//     })
//     if (currNode.id == 'ZZZ') {
//         console.log('made it in', steps, 'steps')
//         break;
//     }
// }

console.timeEnd('traversing')