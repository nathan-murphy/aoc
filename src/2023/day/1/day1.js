import { Data } from "../../index.js";

function findFirstNumber(s) {
    let firstNumber = s.replace(/^\D+/g, '')[0]
    if (firstNumber == undefined) {
        firstNumber = '0';
    }
    return firstNumber;
}

function findLastNumber(s) {
    let end = s.split("").reverse().join("")
    return findFirstNumber(end)
}

function findNumberPartTwo(s, forward) {
    let numberIndex = NaN;
    const numberMatches = s.matchAll(RegExp(/\d/, 'g'))
    let numberMatch;
    for(const match of numberMatches) {
        numberMatch = match
        numberIndex = match.index
        if(forward) {break}
    }

    let wordIndex = NaN;
    let matches
    if(forward) {
        const pattern = RegExp(Object.keys(numbersSpelledOut).join("|"), 'g')
        matches = s.matchAll(pattern);
    } else {
        const pattern = RegExp(Object.keys(numbersSpelledOut).join("|").split('').reverse().join(''), 'g')
        const revs = s.split('').reverse().join('')
        matches = revs.matchAll(pattern);
    }
    let wordMatch='';
    for (const match of matches) {
        wordMatch = match;
        if(forward) {
            wordIndex = match.index;
        } else {
            wordIndex = s.length-1 - match.index;
            wordMatch = (wordMatch+'').split('').reverse().join('')
        }
        break;
    }

    let returnFromNumber = isNaN(wordIndex) || (forward && (numberIndex < wordIndex)) || (!forward && (numberIndex > wordIndex));

    if(returnFromNumber) {
        return '' + numberMatch
    } else {
        return numbersSpelledOut[wordMatch]
    }
}

const numbersSpelledOut = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

//-----//

let lines = Data.openInputAsLines('input.txt');
// let totalPartOne = 0
let totalPartTwo = 0

lines.forEach(line => {
    // totalPartOne += Number(findFirstNumber(line) + findLastNumber(line))
    let bothDigits = findNumberPartTwo(line, true) + findNumberPartTwo(line, false)
    console.log("number: " + bothDigits)
    totalPartTwo += Number(bothDigits)
});
// console.log(totalPartOne)
console.log(totalPartTwo)
