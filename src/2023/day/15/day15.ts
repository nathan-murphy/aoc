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

let boxLensPowers:number[] = [];
[...boxes.keys()].forEach(key => {
    console.log(`key: ${key} ` + inspect(boxes.get(key)))

    if(boxes.get(key).length > 0) {
        boxes.get(key).forEach((lens, index) => 
            boxLensPowers.push((key+1) * (index+1) * lens.focalPower)
        )
    }
})
// part 1
console.log(hashValues.reduce((acc, val) => acc += val));

// part 2
console.log(boxLensPowers.reduce((acc, val) => acc += val));
