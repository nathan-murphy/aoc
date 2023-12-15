import { inspect } from "util";
import { puzzleInput } from "../../../helpers/puzzleInput.js";

const line = puzzleInput('C:\\dev\\aoc\\src\\2023\\day\\15\\sample.txt')

let boxes = new Map<number, { label: string, focalPower: number }[]>()

let hashValues: number[] = line.split(',').map(code => {
    let hashVal: number = 0;
    [...code].forEach(c => {
        if (c == '=') {
            let box: { label: string, focalPower: number }[] = []
            if (boxes.has(hashVal)) {
                box = boxes.get(hashVal)
            }

            let newLens = {
                label: code.split('=')[0],
                focalPower: Number(code.split('=')[1]),
            }

            let lensIndex: number = box.findIndex(lens => lens.label == newLens.label)

            if (lensIndex > -1)
                box.splice(lensIndex, 1, newLens)
            else
                box.push(newLens);

            boxes.set(hashVal, box)
        }
        if (c == '-') {
            if (boxes.has(hashVal)) {
                let box: { label: string, focalPower: number }[] = []
                box = boxes.get(hashVal)

                let lensIndex: number = box.findIndex(lens => lens.label == code.split('-')[0])
                if (lensIndex > -1)
                    box.splice(lensIndex, 1)

                boxes.set(hashVal, box)
            }
        }
        hashVal = ((hashVal + c.charCodeAt(0)) * 17) % 256;
    })
    return hashVal;
});

let boxLensPowers: number[] = [];
for (const [boxNumber, lenses] of boxes)
    boxLensPowers.push(...lenses.map((lens, lensIndex) => (boxNumber + 1) * (lensIndex + 1) * lens.focalPower))

// part 1
console.log(hashValues.reduce((acc, val) => acc += val));

// part 2
console.log(boxLensPowers.reduce((acc, val) => acc += val));
