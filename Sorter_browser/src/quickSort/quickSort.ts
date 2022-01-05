
export function quickSort(array: number[]): number[] {
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length-1);
    return array;
}


function quickSortHelper(array: number[], start: number, end: number): void {
    if (start >= end) return;
    let part = partition(array, start, end);
    quickSortHelper(array, start, part);
    quickSortHelper(array, part+1, end);
}


function partition(array: number[], start: number, end: number): number {
    let pivot = array[start];
    let i = start - 1;
    let j = end + 1;
    while(true) {
        while(true) {
            if (array[++i] >= pivot) break;
        }
        while(true) {
            if (array[--j] <= pivot) break;
        }
        if (i >= j) return j;
        [array[j], array[i]] = [array[i], array[j]];
    }
}