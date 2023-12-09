

import { Data } from "../../index.js";
import { Interval } from "../../index.js";

let puzzleInput = Data.openInput('input.txt');
let mapsInput = puzzleInput.split('\r\n\r\n')

const seeds = [...mapsInput.splice(0, 1)[0].matchAll(/\d+/g)]

let compressedMap = {}
mapsInput.forEach((mapInput, map) => {
    let lines = mapInput.split('\r')
    lines.splice(0, 1);
    compressedMap[map] = []
    lines.forEach((line, rangeSpec) => {

        compressedMap[map][rangeSpec] = []

        let instructions = [...line.matchAll(/\d+/g)]

        let destRangeStart = Number(instructions[0])
        let srcRangeStart = Number(instructions[1])
        let length = Number(instructions[2]) - 1

        compressedMap[map][rangeSpec]['destRangeStart'] = destRangeStart
        compressedMap[map][rangeSpec]['srcRangeStart'] = srcRangeStart
        compressedMap[map][rangeSpec]['rangeLength'] = length

        compressedMap[map][rangeSpec]['srcInterval'] = new Interval(srcRangeStart, srcRangeStart + length )
        compressedMap[map][rangeSpec]['destInterval'] = new Interval(destRangeStart, destRangeStart + length)
    })
});

function findSeedLoc(seed) {
    let src = Number(seed)
    for (const map in compressedMap) {
        for (const rangeSpec in compressedMap[map]) {
            const start = compressedMap[map][rangeSpec]['srcRangeStart']
            const dest = compressedMap[map][rangeSpec]['destRangeStart']

            const srcInterval = compressedMap[map][rangeSpec]['srcInterval']

            if (srcInterval.has(src)) {
                src = (src - start) + dest;
                break;
            }
        }
    }
    return src
}

function findSeedLocByRange(range) {
    let projectedRanges = [range]
    
    for (const map in compressedMap) {
        let srcIntervals = []
        let destIntervals = []
        for (const rangeSpec in compressedMap[map]) {
            srcIntervals.push(compressedMap[map][rangeSpec]['srcInterval'])
            destIntervals.push(compressedMap[map][rangeSpec]['destInterval'])
        }
        let rangesToAdd = []

        for(const rangeIndex in projectedRanges)
            rangesToAdd.push(...splitInterval(projectedRanges[rangeIndex], srcIntervals, destIntervals))

        projectedRanges = rangesToAdd
    }
    return projectedRanges;
}

function splitInterval(intervalToSplit, srcIntervals, destIntervals) {
    for (const interval in srcIntervals) {
        const srcRange = srcIntervals[interval]
        const destRange = destIntervals[interval]

        if (srcRange.has(intervalToSplit.start)) {
            if (srcRange.has(intervalToSplit.end)) {
                return [mapIntervals(srcRange, intervalToSplit, destRange)]
            }
            else {
                let firstPartOfInterval  = new Interval(intervalToSplit.start, srcRange.end)
                let secondPartOfInterval = new Interval(srcRange.end + 1, intervalToSplit.end)
                return [
                    mapIntervals(srcRange, firstPartOfInterval, destRange),
                    ... splitInterval(secondPartOfInterval, srcIntervals, destIntervals)
                ]
            }
        }
    }
    return [intervalToSplit]
}

function mapIntervals(srcRange, rangeToMap, destRange) {
    let offset = destRange.start - srcRange.start
    return new Interval(rangeToMap.start + offset, rangeToMap.end + offset)
}

let minPartTwo = Infinity;

console.time()
for (let i = 0; i < seeds.length; i = i + 2) {
    // console.log('seed number: ', i)
    let seedNum = Number(seeds[i])
    let length = Number(seeds[i + 1])-1

    let seedRange = new Interval(seedNum, seedNum + length)
    let ranges = findSeedLocByRange(seedRange)
    for(const rangeIndex in ranges) {
        minPartTwo = Math.min(ranges[rangeIndex].start, minPartTwo)
    }
}
console.timeEnd()
console.log(minPartTwo);