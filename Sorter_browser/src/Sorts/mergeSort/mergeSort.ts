//This is going to be a bottom up, circular queue, natural (exploits natural runs) merge sort. Also I'm going to do forwards and reverse runs.
//Why? I got bored. 

//There's going to be a large difference between the animated and non-animated version
//Since each merge between ListNodes is done independent of the global array, I won't know what 
//positions to push animations to. I'm going to need to store and maintain an offset for each merge.

type ListNode = {
    array: number[],
    next: ListNode | null,
} 

export const mergeSort = (array: number[]): number[] => {
    if (array.length <= 1) return array;    //already sorted

    let node = convertToLists(array);       //I'm always going to have at least one ListNode in node

    while(node.next !== null)               //while there is more than 1 node
        node = merge(node, node.next);

    return node.array;
}

const merge = (a: ListNode, b: ListNode): ListNode => {
    //insertion sort for O(a+b)
    let i = 0;
    let j = 0;
    let k = 0;
    let merged = new Array(a.array.length + b.array.length); //faster than realloc

    while (true) {
        if (i < a.array.length && j < b.array.length) {
            if (a.array[i] <= b.array[j])   //stable
                merged[k++] = a.array[i++];
            else    
                merged[k++] = b.array[j++];
        } else if (i < a.array.length) 
            merged[k++] = a.array[i++];
        else if (j < b.array.length)
            merged[k++] = b.array[j++];
        else 
            break;
    }
    a.array = merged;

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

const convertToLists = (arr: number[]): ListNode => {
    let i = 0;
    let node: ListNode =  { array: [ arr[ i++ ] ], next: null };    //head with single value to begin, usually I like dummy heads, but this is circular so that gets messy
    let head = node; //hang on to the head for later

    while (i < arr.length) {
        let newNode: ListNode =  { array: [ arr[ i++ ] ], next: null };
        node.next = newNode;
        node = newNode;

        if (i === arr.length) break;

        if (arr[i] >= node.array[0])
            i = forwardRun(arr, node, i);
        else
            i = reverseRun(arr, node, i);
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

const reverseRun = (arr: number[], node: ListNode, i: number): number => {
    while( (i < arr.length) && (arr[i] <= node.array[ node.array.length-1 ]) )
        node.array.push( arr[i++] )
    node.array.reverse();
    return i;
}