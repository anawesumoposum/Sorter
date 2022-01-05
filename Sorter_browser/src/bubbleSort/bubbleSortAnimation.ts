import { Animation } from '../Sorter/Sorter';

export function bubbleSortAnimation(array: number[]): Animation[] {
    let animations: Animation[] = [];
    for (let i = 0; i < array.length-1; i++) {
        for (let j = 0; j < array.length-i-1; j++) {
            if (array[j] > array[j+1]) {
                animations.push( {from: [j, j+1], to: [j+1, j]} );
                let swap: number = array[j];
                array[j] = array[j+1];
                array[j+1] = swap;
            }
        }
    }
    return animations;
}