import { Data } from "../../index.js";

const colors = ['red', 'green', 'blue']
let patterns = []
const limits = [12, 13, 14]

function solvept2(lines) {
    let total = 0;
    lines.forEach((line, gameIndexMinusOne) => {
        let rgbmax = [0, 0, 0];
        line.split(';').forEach(round => {
            let test = []
            colors.forEach((color, index) => {
                let num = Number(round.match(patterns[index])?.toString().split(' ', 1));
                num = Number.isNaN(num) ? 0 : num

                if(num > rgbmax[index]) {
                    rgbmax[index] = num
                }
            })
        });
        console.log(rgbmax)
        total += rgbmax[0] * rgbmax[1] * rgbmax[2]
    })
    return total;
}

function solve(lines) {
    let total = 0;
    let goodGames = [];
    lines.forEach((line, gameIndexMinusOne) => {
        line.split(';').every(round => {
            let test = []
            colors.forEach((color, index) => {
                let num = Number(round.match(patterns[index])?.toString().split(' ', 1));
                test.push(Number.isNaN(num) ? 0: num)
            })
            let result = !testExceedsLimits(test)
            goodGames[gameIndexMinusOne] = result
            return result
        });
    })
    goodGames.forEach((game, index) => {
        if(game) { total += index + 1}
    })
    return total;
}

function testExceedsLimits(test) {
    let testExceedsLimits = false;
    limits.forEach((limit, index) =>{
        if (test[index] > limit) {
            testExceedsLimits = true;
            return;
        }
    })
    return testExceedsLimits
}

//-----//

let lines = Data.openInputAsLines('input.txt');
colors.forEach(color => patterns.push(new RegExp("\\d+ " + color)))
// console.log(solve(lines));
console.log(solvept2(lines))