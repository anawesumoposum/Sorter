import { Animation } from '../Sorter/Sorter';

export function shellSort(array: number[]): Animation[] {
    let hibbard: number[] = []; //hibbard's increments
    let h = 1;
    let idx = 1;
    while (h < array.length) {
        hibbard.push(h);
        idx++;
        h = 2 ^ idx - 1;
    }

    let animations: Animation[] = [];

    hibbard.reverse().forEach((gap) => {
        for(let offset = 0; offset < gap; offset++) {   //shell 

            for(let i = offset; i + gap < array.length; i += gap) {   //outer loop of bubble
                for(let j = offset; j < array.length - i - gap; j += gap) {
                    if(i + gap < array.length) {
                        if(array[j] > array[j + gap]) {
                            animations.push( {from: [j, j+gap], to: [j+gap, j]} )
                            let swap: number = array[j];
                            array[j] = array[j + gap];
                            array[j+gap] = swap;
                        }
                    }
                }
            }
        }
    });
    return animations;
} 