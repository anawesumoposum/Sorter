import { Animation } from '../../Sorter/Sorter';

export function quickSortAnimation(array: number[]) {
    let animations: Animation[] = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length-1, animations);
    return animations;
}


function quickSortHelper(array: number[], start: number, end: number, animations: Animation[]): void {
    if (start >= end) return;
    let part = partition(array, start, end, animations);
    quickSortHelper(array, start, part, animations);
    quickSortHelper(array, part+1, end, animations);
}


function partition(array: number[], start: number, end: number, animations: Animation[]): number {
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
        animations.push( {from: [i, j], to: [j, i]} );
    }
}