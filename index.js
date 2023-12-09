// const fs = require('fs')

import readFileSync from 'node:fs'

// 'day/1/input.txt'
export class Data {
    static openInput(path) {
        return readFileSync.readFileSync(path, { encoding: 'utf-8', flag: 'r' })
    }
    static openInputAsLines(path) {
        return readFileSync.readFileSync(path, { encoding: 'utf-8', flag: 'r' }).split('\n')
    }
}

export class Interval {
    constructor(start, end) {
        this.start = start
        this.end = end
    }

    contains = this.has;
    sub = this.subtract;
    and = this.intersect;

    has(key) {
        let greaterThanStart = key >= this.start
        let lessThanEnd = key <= this.end
        return greaterThanStart && lessThanEnd

    }

    intersect(other) {
        if (this.start > other.end || other.start > this.end)
            return undefined

        let newStart = Math.max(this.start, other.start)
        let newEnd = Math.min(this.end, other.end)
        return new Interval(newStart, newEnd)
    }

    subtract(other) {
        let out = []
        let s = 0, e = 0

        s = this.start, e = Math.min(this.end, other.start - 1)
        if (s <= e)
            out.push(new Interval(s, e))

        s = Math.max(this.start, other.end + 1), e = this.end
        if (s <= e)
            out.push(new Interval(s, e))

        return out
    }
}