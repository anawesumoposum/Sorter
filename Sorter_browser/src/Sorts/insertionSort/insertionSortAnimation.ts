import { Animation } from '../../Sorter/Sorter';

export const insertionSortAnimation = (array: number[]): Animation[] => {
    let animations: Animation[] = [];
    if (array.length < 2) return animations; //already sorted or empty
    let i = 1;
    while (i < array.length) {
        let j = i;
        while (j > 0 && array[j-1] > array[j]) {
            swap(array, animations, j-1, j--);
        }
        i++;
    }
    return animations;
} 

const swap = (array: number[], animations: Animation[], a: number, b: number) => {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    animations.push( { from: [a, b], to: [b, a] } );
}
