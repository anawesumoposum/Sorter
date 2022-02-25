export const insertionSort = (array: number[]): number[] => {
    if (array.length < 2) return array; //already sorted or empty
    let i = 1;
    while (i < array.length) {
        let j = i;
        while (j > 0 && array[j-1] > array[j]) {
            swap(array, j-1, j--);
        }
        i++;
    }
    return array;
} 

const swap = (array: number[], a: number, b: number) => {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
