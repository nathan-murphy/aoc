import { Data } from "../../index.js";
let lines = Data.openInputAsLines('input.txt');
let numCards = lines.length;
let numScratchCards = {}
for (let i = 0; i < numCards; i++) {
    numScratchCards[i] = 1;
}

let total = 0;
let total2 = 0;

lines.forEach((line, index) => {
    let numbers = line.split(':')[1].split('|')
    let leftNumbers = numbers[0];
    let rightNumbers = numbers[1];

    let winningNumbers = []
    let numbersWeHave = []

    for (const match of leftNumbers.matchAll(RegExp(/\d+/, 'g'))) {
        winningNumbers.push(Number(match))
    }
    for (const match of rightNumbers.matchAll(RegExp(/\d+/, 'g'))) {
        numbersWeHave.push(Number(match))
    }

    let overlap = winningNumbers.filter(num => numbersWeHave.includes(num))

    if (overlap.length > 0) {
        let points = Math.pow(2, overlap.length - 1)
        total += points

        for (let j = 0; j < numScratchCards[index]; j++)
            for (let i = index + 1; i < Math.min(index + 1 + overlap.length, numCards); i++)
                numScratchCards[i]++

    }
})

for (let cardNumber in numScratchCards) {
    total2 += numScratchCards[cardNumber]
}

console.log(total)
console.log(total2)