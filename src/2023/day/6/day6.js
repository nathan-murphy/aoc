console.time()

import { Data } from "../../index.js";
let puzzleInputLines = Data.openInputAsLines('input2.txt');

let races = []
let key = 'time'
puzzleInputLines.forEach(line => {
    let matches = [... line.matchAll(/\d+/g)]
    matches.forEach((match, raceNumber) => {
        if(races[raceNumber] == undefined)
            races[raceNumber] = []
        races[raceNumber][key] = Number(match)
    })
    key = 'distance'
})

let mult = 1;
races.forEach(race => {
    let time = race['time'];
    let recordDistance = race['distance']

    let waysToWin = 0;
    for(let t=1; t < time; t++) {
        let distance = (time - t) * t
        if(distance > recordDistance)
            waysToWin++
    }
    mult *= waysToWin
})

console.log(mult)

console.timeEnd()