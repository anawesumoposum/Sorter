export function heapSort(array: number[]): number[] {
    if(array.length < 2) return array;  //an array of length 1 is already sorted

    let bound = array.length;
    heapify(array, bound);

    while (bound > 1) { //no need to sort final element, it'll already be the smallest
        swap(array, 0, bound-1);
        bound--;
        heapify_down(array, 0, bound);
    }

    return array;
}

function heapify(array: number[], bound: number): number[] {
    for (let i = 1; i < bound; i++) {
        let parent = Math.floor( (i - 1) / 2 );
        if (array[i] > array[parent]) 
            heapify_up(array, i, parent);
    }
    return array;
}

function heapify_down(array: number[], parent: number, bound: number) {
    let lchild = parent * 2 + 1;
    let rchild = parent * 2 + 2;
    let ptr: number;

    while (lchild < bound) {    
        if (array[rchild] > array[lchild] && rchild < bound)
            ptr = rchild;
        else 
            ptr = lchild;

        if(array[parent] < array[ptr])
            swap(array, parent, ptr);
        else 
            return;

        parent = ptr;
        lchild = parent * 2 + 1;
        rchild = parent * 2 + 2;
    }
}

function heapify_up(array: number[], child: number, parent: number) {
    swap(array, parent, child);

    child = parent;
    parent = Math.floor( (child - 1) / 2 );

    if (array[child] > array[parent]) 
        heapify_up(array, child, parent);
}

function swap(array: number[], i: number, j: number) {
    let ptr = array[i];
    array[i] = array[j];
    array[j] = ptr;
}