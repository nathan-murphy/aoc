import { Interval } from "./index.js";

let i1 = new Interval(3, 10);
let i2 = new Interval(5, 8);

console.log(i1.and(i2))
console.log(i1.sub(i2))
;