export function transpose(matrix: string[][]): string[][] {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

export function transposeArrayOfStrings(strings: string[]): string[] {
    let matrix: string[][] = [];
    strings.forEach(string => matrix.push([...string]))
    let transposedMatrix = transpose(matrix);
    let ret: string[] = []
    transposedMatrix.forEach(row => ret.push(row.join('')))
    return ret
}