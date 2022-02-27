//This is going to be a bottom up, circular queue, natural (exploits natural runs) merge sort. Also I'm going to do forwards and reverse runs.
//Why? I got bored. 

import { Animation } from '../../Sorter/Sorter';

//There's going to be a large difference between the animated and non-animated version
//Since each merge between ListNodes is done independent of the global array, I won't know what 
//positions to push animations to. I'm going to need to store and maintain an offset for each merge.

type ListNode = {
    array: number[],
    next: ListNode | null,
    offset: number,
} 

export const mergeSortAnimation = (array: number[]): Animation[] => {
    let animations: Animation[] = [];
    if (array.length <= 1) return animations;    //already sorted

    let maxlen = array.length;

    let node = convertToLists(array, animations);       //I'm always going to have at least one ListNode in node

    while(node.next !== null)               //while there is more than 1 node
        node = merge(node, node.next, animations, maxlen);

    //problem that the raw sort doesn't have: the offset won't necessarily be 0; 
    //the final suriving ListNode may be the last one for all I know since I made it circular
    //we need one final animation frame to shift the array around until offset is 0 again
    if (node.offset !== 0)
        animations.push( {  from: [...Array(node.array.length).keys()].map(i => (i + node.offset) % node.array.length), 
                            to: [...Array(node.array.length).keys()].map(i => i) } );

    return animations;
}

const merge = (a: ListNode, b: ListNode, animations: Animation[], maxlen: number): ListNode => {
    //insertion sort for O(a+b)
    let i = 0;
    let j = 0;
    let k = 0;
    let merged = new Array(a.array.length + b.array.length); //faster than realloc

    //animation frames
    let from: number[] = [];
    let to: number[] = [];

    while (true) {
        if (i < a.array.length && j < b.array.length) {
            if (a.array[i] <= b.array[j]) { //stable
                merged[k] = a.array[i];
                to.push( (a.offset + k++) % maxlen );
                from.push( (a.offset + i++) % maxlen );
            } else {
                merged[k] = b.array[j];
                to.push( (a.offset + k++) % maxlen );
                from.push( (b.offset + j++) % maxlen );
            }
        } else if (i < a.array.length) {
            merged[k] = a.array[i];
            to.push( (a.offset + k++) % maxlen );
            from.push( (a.offset + i++) % maxlen );
        } else if (j < b.array.length) {
            merged[k] = b.array[j];
            to.push( (a.offset + k++) % maxlen );
            from.push( (b.offset + j++) % maxlen );
        } else {
            break;
        }
    }

    a.array = merged;

    animations.push({ from: from, to: to});

    //repair ListNode a, get rid of b
    if (b.next === a)     //no self refs allowed
        a.next = null;
    else    
        a.next = b.next

    delete b.array      //apparently I can't actually delete memory
    delete b.next       //but I can break all refs and tell the GC to pick it up

    if (a.next === null)    //this lets me keep the main loop a one-liner, which I just love
        return a;
    return a.next;
}

const convertToLists = (arr: number[], animations: Animation[]): ListNode => {
    let i = 0;
    let node: ListNode =  { array: [ arr[ i++ ] ], next: null, offset: 0 };    //head with single value to begin, usually I like dummy heads, but this is circular so that gets messy
    let head = node; //hang on to the head for later

    while (i < arr.length) {
        let newNode: ListNode =  { array: [ arr[ i++ ] ], next: null, offset: node.offset + node.array.length };
        node.next = newNode;
        node = newNode;

        if (i === arr.length) break;

        if (arr[i] >= node.array[0])
            i = forwardRun(arr, node, i);
        else
            i = reverseRun(arr, node, i, animations);
    }

    if (node !== head)      //if there is more than 1 list
        node.next = head;   //make into a circle
    return head
} 

const forwardRun = (arr: number[], node: ListNode, i: number): number => {
    while( (i < arr.length) && (arr[i] >= node.array[ node.array.length-1 ]) )
        node.array.push( arr[i++] )
    return i;
}

const reverseRun = (arr: number[], node: ListNode, i: number, animations: Animation[]): number => {
    while( (i < arr.length) && (arr[i] <= node.array[ node.array.length-1 ]) )
        node.array.push( arr[i++] );

    node.array.reverse();

    let frame = { from: [...Array(node.array.length).keys()].map(i => i + node.offset), to: [...Array(node.array.length).keys()].map(i => i + node.offset).reverse()};
    
    animations.push(frame);
    return i;
}