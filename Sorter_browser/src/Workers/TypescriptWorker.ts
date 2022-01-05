import { bubbleSort } from '../bubbleSort/bubbleSort';
import { quickSort } from '../quickSort/quickSort';

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', (event: MessageEvent) => {
    let tag: string = event.data[0];
    let array: number[] = event.data[1];
    let sort;

    switch (tag) {

        case 'bubbleSort': 
            sort = bubbleSort;
            break;
        case 'quickSort':
            sort = quickSort;
            break;
        default:    //shouldn't ever hit this 
            console.log('The selected algorithm hasn\'t been implemented in a typescript worker yet');
            console.log('Please feel free to submit a PR if you feel motivated to do so :)');
            sort = (array: number[]) => {
                return array;
            }
    }

    let time = new Date().getTime();
    array = sort( array );
    time = new Date().getTime() - time;

    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage([time, array]);
});
