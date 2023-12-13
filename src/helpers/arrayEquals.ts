export function arrayEquals(arr1: any[], arr2: any[]):boolean {
    if(arr1.length != arr2.length)
        return false
    return arr1.filter((e, i) => {return e == arr2[i]}).length == arr1.length
}