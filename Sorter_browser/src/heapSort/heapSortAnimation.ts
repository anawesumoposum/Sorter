import { Animation } from '../Sorter/Sorter';

export function heapSortAnimation(array: number[]): Animation[] {
    let animations: Animation[] = [];
    if(array.length < 2) return animations;  //an array of length 1 is already sorted

    let bound = array.length;
    heapify(array, bound, animations);

    while (bound > 1) { //no need to sort final element, it'll already be the smallest
        swap(array, 0, bound-1, animations);
        bound--;
        heapify_down(array, 0, bound, animations);
    }

    return animations;
}

function heapify(array: number[], bound: number, animations: Animation[]): number[] {
    for (let i = 1; i < bound; i++) {
        let parent = Math.floor( (i - 1) / 2 );
        if (array[i] > array[parent]) 
            heapify_up(array, i, parent, animations);
    }
    return array;
}

function heapify_down(array: number[], parent: number, bound: number, animations: Animation[]) {
    let lchild = parent * 2 + 1;
    let rchild = parent * 2 + 2;
    let ptr: number;

    while (lchild < bound) {    
        if (array[rchild] > array[lchild] && rchild < bound)
            ptr = rchild;
        else 
            ptr = lchild;

        if(array[parent] < array[ptr])
            swap(array, parent, ptr, animations);
        else 
            return;

        parent = ptr;
        lchild = parent * 2 + 1;
        rchild = parent * 2 + 2;
    }
}

function heapify_up(array: number[], child: number, parent: number, animations: Animation[]) {
    swap(array, parent, child, animations);

    child = parent;
    parent = Math.floor( (child - 1) / 2 );

    if (array[child] > array[parent]) 
        heapify_up(array, child, parent, animations);
}

function swap(array: number[], i: number, j: number, animations: Animation[]) {
    let ptr = array[i];
    array[i] = array[j];
    array[j] = ptr;
    animations.push( { from: [i, j], to: [j, i] } )
}