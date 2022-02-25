
export function bubbleSort(array: number[]): number[] {
    for (let i = 0; i < array.length-1; i++) {
        for (let j = 0; j < array.length-i-1; j++) {
            if (array[j] > array[j+1]) {
                let swap: number = array[j];
                array[j] = array[j+1];
                array[j+1] = swap;
            }
        }
    }
    return array;
}