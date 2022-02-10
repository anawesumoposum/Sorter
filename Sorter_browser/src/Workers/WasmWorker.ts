import * as wasm from "../../node_modules/algorithms_in_rust_for_wasm";
import { isCorrect } from './correctness';

//export {};
//const wasm = import("./asyncLoad.js")
//    .catch((e) => console.error("Error importing wasm within asyncLoad", e));
//const wasm = async () => {
//    await import("algorithms_in_rust_for_wasm");
//}

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', (event: MessageEvent) => {
    let tag: string = event.data[0];
    let array: number[] = event.data[1];
    let sort;

    switch (tag) {

        case 'bubbleSort': 
            sort = wasm.bubble_sort;
            break;
        //case 'quickSort':
        //    sort = quickSortAnimation;
        //    break;
        default:    //shouldn't ever hit this 
            console.log('The selected algorithm hasn\'t been implemented in a wasm worker yet');
            console.log('Please feel free to submit a PR if you feel motivated to do so :)');
            sort = (array: string) => {
                return array;
            }
    }

    let time = new Date().getTime();
    let temp = JSON.stringify(array);
    console.log(temp);
    array = JSON.parse( sort( temp ) );
    time = new Date().getTime() - time;

    let correct = isCorrect(array);

    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage([time, correct]);
});