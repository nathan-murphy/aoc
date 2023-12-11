import {
  puzzleInput,
  puzzleInputAsLines,
} from "../../../helpers/puzzleInput.js";

const lines = puzzleInputAsLines(
  "C:\\dev\\aoc\\src\\2023\\day\\10\\sample.txt"
);

const stringMap = puzzleInput("C:\\dev\\aoc\\src\\2023\\day\\10\\sample.txt");

class StringMap {
  printableMap: string;
  map: string;
  width: number;
  height: number;

  validLeft = ["-", "L", "F"];
  validRight = ["-", "7", "J"];
  validUp = ["|", "7", "F"];
  validDown = ["|", "J", "L"];

  constructor(map: string) {
    this.printableMap = String(map);
    this.width = map.indexOf("\r\n");
    this.map = map.replaceAll("\r\n", "");
    this.height = this.map.length / this.width;
    console.log("map size: ", this.width, "x", this.height);
  }
  findStart(): { x: number; y: number } {
    const s = this.map.indexOf("S");
    return { x: s % this.width, y: Math.floor(s / this.width) };
  }
  getMap(): string {
    return this.printableMap;
  }
  pipesConnectedTo(p: { x: number; y: number }) {
    // get the character
    // check if it's undefined
    // check for validity
    // if valid, add to path
    // find character on other end of valid character
    // start search again

    let lookAt: Function[] = [this.left, this.right, this.up, this.down]

    let valid
    while(true) {

    }

    let l = this.left(p)
    if(l != undefined)
      this.validLeft.indexOf(l);
  }
  left(p: { x: number; y: number }): string {
    console.log('looking left')
    if (p.x != 0) return this.map[p.y * this.width + (p.x - 1)];
    else return undefined;
  }
  right(p: { x: number; y: number }): string {
    if (p.x != this.width) return this.map[p.y * this.width + (p.x + 1)];
    else return undefined;
  }
  up(p: { x: number; y: number }): string {
    if (p.y != 0) return this.map[(p.y - 1) * this.width + p.x];
    else return undefined;
  }
  down(p: { x: number; y: number }): string {
    if (p.y != this.height) return this.map[(p.y + 1) * this.width + p.x];
    else return undefined;
  }
}

const map = new StringMap(stringMap);

console.log(map.getMap());
console.log("start", map.findStart());
console.log(map.pipesConnectedTo(map.findStart()));
