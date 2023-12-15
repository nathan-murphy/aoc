import { puzzleInput } from "../../../helpers/puzzleInput.js";

const line = puzzleInput('C:\\dev\\aoc\\src\\2023\\day\\15\\input.txt')

let hashValues: number[] = line.split(',').map(code => {
    let hashVal: number = 0;
    [...code].forEach(c => {
        hashVal = ((hashVal + c.charCodeAt(0)) * 17) % 256;
    })
    return hashVal;
})

console.log(hashValues.reduce((acc, val) => acc += val))

