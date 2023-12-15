import { inspect } from "util";

export class Grid {
    data: any[][]

    constructor(initialData?: any[][]) {
        if (initialData == undefined)
            initialData = []
        this.data = initialData;
    }

    numRows(): number {
        return this.data.length
    }

    numCols(): number {
        return this.data[0].length
    }

    cols(): any[] {
        let cols: any[] = [];
        for (let i = 0; i < this.numCols(); i++) {
            cols.push(this.getColumn(i))
        }
        return cols;
    }

    addRowToBottom(t: any[]): this {
        this.data.push(t);
        return this;
    }

    addRowToTop(t: any[]): this {
        this.data.unshift(t);
        return this;
    }

    addColumnToEnd(t: any[]): this {
        t.forEach((e, i) => {
            if(this.data[i] == undefined)
                this.data[i] = [];
            this.data[i].push(e)
        })
        return this;
    }

    addColumnToStart(t: any[]): this {
        t.forEach((e, i) => this.data[i].unshift(e))
        return this;
    }

    getColumn(i: number): any[] {
        let col: any[] = [] 
        this.data.forEach(row => col.push(row[i]))
        return [...col];
    }

    getRow(i: number): any[] {
        return this.data[i]
    }

    getRows(start?: number, end?:number): any[] {
        return this.data.slice(start, end)
    }

    getColumnSubset(i: number, start: number, end: number): any[] {
        return this.getColumn(i).slice(start, end)
    }

    elemAt(row: number, col: number): any {
        return this.data[row][col]
    }

    transpose(): this {
        this.data = this.data[0].map((col, c) => this.data.map((row, r) => this.data[r][c]));
        return this;
    }
}

export class StringGrid extends Grid {

    constructor() {
        super();
    }

    addStringRowToBottom(s: string): this {
        this.addRowToBottom([...s]);
        return this;
    }

    addStringColumnToEnd(s: string): this {
        this.addColumnToEnd([...s]);
        return this;
    }

    stringCols(): string[] {
        let cols: string[] = [];
        for (let i = 0; i < this.numCols(); i++) {
            cols.push(this.getStringColumn(i))
        }
        return cols;
    }

    stringRows(): string[] {
        let rows: string[] = []
        for(let i = 0; i < this.numRows();i ++) {
            rows.push(this.getStringRow(i))
        }
        return rows;
    }

    getStringColumn(i: number): string {
        let s: string = this.getColumn(i).join('');
        return s;
    }

    getStringRow(i: number): string {
        let s: string = this.getRow(i).join('');
        return s;
    }

    stringRowsAsString(): string {
        return this.stringRows().join('\r\n')
    }

    getStringColumnSubset(i: number, start: number, end: number): string {
        let s: string = this.getColumnSubset(i, start, end).join('');
        return s;
    }
}

//-----//

// let g = new StringGrid()
// g.addStringRowToBottom('test')
// g.addStringRowToBottom('demo')
// g.addStringRowToBottom('lego')
// g.addStringRowToBottom('milk')
// console.log(inspect(g.getStringColumn(0)));               // 'tdlm'
// console.log(inspect(g.getStringColumn(2)));               // 'smgl'
// console.log(inspect(g.getStringRow(0)));                  // 'test'
// console.log(inspect(g.getStringRow(3)));                  // 'milk'
// console.log(inspect(g.getStringColumnSubset(0, 1, 3)));   // 'dl'
// console.log(inspect(g.elemAt(2,0)))                       // 'l'
// console.log(inspect(g.elemAt(2,1)))                       // 'e'
// console.log(inspect(g.elemAt(2,2)))                       // 'g'
// console.log(inspect(g.elemAt(2,3)))                       // 'o'
// console.log(inspect(g))
// console.log(inspect(g.transpose()))
// console.log(inspect(g.getStringColumn(0)))                // 'test'
// console.log(inspect(g.transpose()))