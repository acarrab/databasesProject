export interface HashSet {
    [index: number]: boolean
}

export function getSetOf(arr: Array<number>): HashSet {
    var hs: HashSet = {}
    for (let i = 0; i < arr.length; i++) {
        hs[arr[i]] = true
    }
    return hs
}