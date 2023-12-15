import { inspect } from "util";
import { puzzleInput } from "../../../helpers/puzzleInput.js";

const line = puzzleInput('C:\\dev\\aoc\\src\\2023\\day\\15\\input.txt')

let boxes = new Map<number, { label: string, focalPower: number }[]>()

let hashValues: number[] = line.split(',').map(code => {
    let hashVal: number = 0;
    [...code].every(c => {
        if (c == '=') {
            let box: { label: string, focalPower: number }[] = []
            if (boxes.has(hashVal)) {
                box = boxes.get(hashVal)
            }

            let lensIndex: number = box.findIndex(lens => lens.label == code.split('=')[0])
            if (lensIndex > -1)
                box.splice(lensIndex, 1, {
                    label: code.split('=')[0],
                    focalPower: Number(code.split('=')[1]),
                })
            else
                box.push({
                    label: code.split('=')[0],
                    focalPower: Number(code.split('=')[1]),
                });

            boxes.set(hashVal, box)
            return false
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
            return false
        }
        hashVal = ((hashVal + c.charCodeAt(0)) * 17) % 256;
        return true
    })
    return hashVal;
});

// console.log(inspect(hashValues))

// console.log(hashValues.reduce((acc, val) => acc += val));

let power = 0;
let boxLensPowers:number[] = [];
[...boxes.keys()].forEach(key => {
    //The focusing power of a single lens is the result of multiplying together:
    
    // One plus the box number of the lens in question.
    // The slot number of the lens within the box: 1 for the first lens, 2 for the second lens, and so on.
    // The focal length of the lens.
    console.log(`key: ${key} ` + inspect(boxes.get(key)))

    if(boxes.get(key).length > 0) {
        boxes.get(key).forEach((lens, index) => {
            let lensPower = (key+1) * (index+1) * lens.focalPower;
            console.log(`lens index: ${index+1}, focal power: ${lens.focalPower}, lens power = ${lensPower}`)
            boxLensPowers.push(lensPower)
        })
    }
})
console.log(boxLensPowers.reduce((acc, val) => acc += val));

