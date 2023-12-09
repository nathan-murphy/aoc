import { Data } from "../../index.js";

const numberMatch = new RegExp('d+', 'g')

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() { return this.x }
    getY() { return this.y }
}

class CoordFactory {

    allCoords = {}

    lookupKey(x, y) { return x.toString() + ', ' + y.toString() }

    createCoord(x, y) {
        let newCoord = new Coord(x, y)
        this.allCoords[this.lookupKey(x, y)] = newCoord;
        return newCoord
    }

    getCoord(x, y) {
        let coordToReturn;
        if (!this.allCoords[this.lookupKey(x, y)]) {
            coordToReturn = this.createCoord(x, y);
        }
        else {
            coordToReturn = this.allCoords[this.lookupKey(x, y)]
        }
        return coordToReturn;
    }
}

class CoordCalculator {
    leftOf(coord) {
        return cf.getCoord(coord.getX() - 1, coord.getY());
    }
    rightOf(coord) {
        return cf.getCoord(coord.getX() + 1, coord.getY());
    }
    above(coord) {
        return cf.getCoord(coord.getX(), coord.getY() - 1);
    }
    below(coord) {
        return cf.getCoord(coord.getX(), coord.getY() + 1);
    }
    topLeftOf(coord) {
        return cf.getCoord(coord.getX() - 1, coord.getY() + 1);
    }
    topRightOf(coord) {
        return cf.getCoord(coord.getX() + 1, coord.getY() + 1);
    }
    bottomLeftOf(coord) {
        return cf.getCoord(coord.getX() - 1, coord.getY() - 1);
    }
    bottomRightOf(coord) {
        return cf.getCoord(coord.getX() + 1, coord.getY() - 1);
    }
}

class MapNumber {
    num;
    covers = [];
    adj = [];
    cc = new CoordCalculator();

    constructor(coord, val) {
        this.num = val;
        this.calcCoversCoords(coord, val);
        this.findAdjacentCoords();
    }

    calcCoversCoords(coord, val) {
        for (let i = coord.getX(); i < coord.getX() + val.toString().length; i++) {
            this.covers.push(cf.getCoord(i, coord.getY()));
        }
    }

    findAdjacentCoords() {
        let left = this.covers[0];
        let right = this.covers[this.covers.length - 1]
        this.adj.push(this.cc.leftOf(left))
        this.adj.push(this.cc.topLeftOf(left))
        this.adj.push(this.cc.bottomLeftOf(left))
        this.adj.push(this.cc.rightOf(right))
        this.adj.push(this.cc.topRightOf(right))
        this.adj.push(this.cc.bottomRightOf(right))
        this.covers.forEach(coord => {
            this.adj.push(this.cc.above(coord))
            this.adj.push(this.cc.below(coord))
        })
    }
}

function solve(lines) {
    let mapNumbers = []
    let mapSymbols = []
    let gearSymbols = []
    let total = 0;
    let total2 = 0;

    lines.forEach((line, index) => {
        const numberMatches = line.matchAll(RegExp(/\d+/, 'g'));
        for (const match of numberMatches) {
            mapNumbers.push(new MapNumber(cf.getCoord(match.index, index), Number(match)))
        };
        
        const symbolMatches = line.matchAll(RegExp(/[^.\d]/, 'g'))
        for (const match of symbolMatches) {
            if (match.toString() != '\r')
                mapSymbols.push(cf.getCoord(match.index, index))
        }

        const possibleGearMatches = line.matchAll(RegExp(/\*/, 'g'))
        for (const match of possibleGearMatches) {
            gearSymbols.push(cf.getCoord(match.index, index))
        }
    });

    mapNumbers.forEach((mapNumber) => {
        let overlap = mapNumber.adj.filter(adjCoord => mapSymbols.includes(adjCoord))
        if(overlap.length > 0) {
            total += mapNumber.num;
        }
    })

    gearSymbols.forEach(gearSymbol => {
        let appearsIn = 0;
        let ratio = 1;
        mapNumbers.forEach((mapNumber) => {
            if(mapNumber.adj.includes(gearSymbol)) {
                appearsIn++;
                ratio *= mapNumber.num;
            }
        })
        if(appearsIn == 2) {
            total2 += ratio;
        }
    })
    console.log(total2)

    return total;
}

let lines = Data.openInputAsLines('input.txt');
let cf = new CoordFactory(lines[0].length, lines.length);

console.log(solve(lines))
