/*const timSort = (array: number[]): number[] => {
    if (array.length < 2) return array;
    

    merge(array0, array1)


}

merge() {
    binarySearch( array0, array1[0] )   //where first element of second run fits in first run
    binarySearch( array0, array1[0] )   //where last element of first run fits in second run
    //elements before and after are already in right place, only merge between 
    //smaller of remaining elements of the two is copied into mem, merged with larger run into free space
    //if first is smaller merge at beginning, if second is smaller starts at end

}

z > y + x
y > x 
else merge 

const insertionSort = (array: number[]): number[] => {
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
*/