import React from 'react';
import './Sorter.css';

//const size = 300; //approx right for 1920px screen width
const size = Math.floor((screen.availWidth - 16) / 6);  //8px margin main bounding box, 4px per bar + 1px margin each side


type SorterState = {
    array: number[];
    didChange: number[];
    running: boolean,
    tsWorker: Worker,
    tsTime: number,
    tsResponded: boolean,
    wasmWorker: Worker,
    wasmTime: number,
    wasmResponded: boolean,
    animationWorker: Worker;
    animationTime: number;
    animationResponded: boolean,
    animations: Animation[];
}

export type Animation = {   
    //the values are indexes that are modified by a step of sorting - I don't have to store values!
    from: number[];
    to: number[];
}


export default class Sorter extends React.Component<{}, SorterState> {
    constructor(props: any) {
        super(props);

        this.state = {
            array: [],
            didChange: [],
            running: false,
            tsWorker: new Worker(new URL("../Workers/TypescriptWorker.ts", import.meta.url)),
            tsTime: 0,
            tsResponded: false,
            wasmWorker: new Worker(new URL("../Workers/WasmWorker.ts", import.meta.url)),
            wasmTime: 0,
            wasmResponded: false,
            animationWorker: new Worker(new URL("../Workers/AnimationWorker.ts", import.meta.url)),
            animationTime: 0,
            animationResponded: false,
            animations: [],
        };
    }


    componentDidMount() {
        this.newArray();

        // eslint-disable-next-line
        this.state.animationWorker.onmessage = (event: MessageEvent) => {
            console.log('animation worker responded');
            this.setState({
                animationTime: event.data[0],
                animations: event.data[1],
                animationResponded: true,
            });
        };

        // eslint-disable-next-line
        this.state.tsWorker.onmessage = (event: MessageEvent) => {
            console.log('ts worker responded');
            if(event.data[1] === false)
                console.log('ts worker sorted incorrectly');
            this.setState({
                tsTime: event.data[0],
                tsResponded: true,
            });
        }

        // eslint-disable-next-line
        this.state.wasmWorker.onmessage = (event: MessageEvent) => {
            console.log('wasm worker responded');
            if(event.data[1] === false)
                console.log('wasm worker sorted incorrectly');
            this.setState({
                wasmTime: event.data[0],
                wasmResponded: true,
            });
        }
    }


    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<SorterState>): void {
        //TODO: wasmResponded is left out while it isn't working
        if( !(prevState.animationResponded && prevState.tsResponded) &&     //if workers were incomplete
         (this.state.animationResponded && this.state.tsResponded) ) {      //but are now complete
            this.setState({ animationResponded: false, tsResponded: false, wasmResponded: false });
            this.startViz();     
        }             
        
    }


    newArray = (): void => {
        if (this.state.running) return; //lock user from messing up state, but keep UI interactive
        let array = new Array(size);
        for(let i=0; i<size; i++) array[i] = Math.floor(Math.random() * size + 1);
        let didChange = new Array(size); 
        for (let i=0; i<size; ++i) didChange[i] = 0;
        this.setState({
            array: array,
            didChange: didChange,
            tsTime: 0,
            wasmTime: 0,
            animationTime: 0,
            animations: []
        });
    }


    startWorkers = (): void => {
        if (this.state.running) return; //currently in render loop, prevent updates while keeping UI interactive

        this.setState({ tsTime: 0, wasmTime: 0, animationTime: 0, running: true }, () => {
            //save local copy of state so I'm not creating data races
            const selectTag = (document.getElementById("sortSelect")) as HTMLSelectElement; //which algo
            let arr = this.state.array.slice(0); //google says this is fastest way to copy array
            
            //typescript benchmark
            this.state.tsWorker.postMessage([selectTag.value, arr]);
            //wasm benchmark courtesy of Rust
            this.state.wasmWorker.postMessage([selectTag.value, arr]);
            //animations
            this.state.animationWorker.postMessage([selectTag.value, arr]); //the worker copies anyway, so this copy may be unecessary
        });
    }


    startViz = (): void => {
        let arr = this.state.array.slice(0); //google says this is fastest way to copy array
        //save local copy of state so I'm not creating data races
        let animations = this.state.animations;

        //if no animations, turn off run flag and return early
        if (animations.length < 1)
            this.setState({ running: false });

        while (true) {
            if (animations.length < 1)
                break;
            let last = false;
            if (animations.length == 1)
                last = true;
            const animation = animations.shift();

            let didChange = new Array(size); for (let j=0; j<size; j++) didChange[j] = 0;   //reset to 0 each time
            let from = animation.from;
            let to = animation.to;
            if (from.length !== to.length) return; //should always be same length and mapping

            let swap: number[] = [];
            for (let j = 0; j < from.length; j++) {    //store swap numbers
                swap.push(arr[from[ j ]]);
                didChange[from[ j ]] = 1;
            }
            for (let j = 0; j < swap.length; j++) {
                arr[to[ j ]] = swap[j];
            }

            //make deep copy for array ptr otherwise array gets sorted before any of the setTimeouts expire and the ptr refs the sorted array
            const tempArr = new Array(arr.length); for(let j=0; j<arr.length; j++) tempArr[j] = arr[j];
            
            setTimeout(
                (tempArr, didChange, last) => {
                    this.setState({
                        array: tempArr,
                        didChange: didChange,
                        running: !last
                    });
                }, 
                3,//ms to allow eye to follow
                tempArr, didChange, last
            );
        }
        this.setState({ animations: [] });
    }


    render() {
        const bars = this.state.array.map((value, key) => {
            if (this.state.didChange[key]) 
                return <div className="bar" key={key} style={{height: value, backgroundColor: 'firebrick'}}></div>;
            else
                return <div className="bar" key={key} style={{height: value, backgroundColor: 'cornflowerblue'}}></div>;
        });

        return (
            <div>
                <div className="sorterContainer">
                    {bars}
                </div>
                <div>
                    <button onClick={this.newArray}>Reset Random Array</button>
                    <select id="sortSelect">
                        <option value='quickSort'>Quick Sort</option>
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value='shellSort'>Shell Sort</option>
                        <option value='heapSort'>Heap Sort</option>
                        <option value='insertionSort'>Insertion Sort</option>
                        <option value='mergeSort'>Merge Sort</option>
                    </select>
                    <button onClick={this.startWorkers}>Sort</button>
                    <div id="benchmark0">Animation Time: {this.state.animationTime}ms</div>
                    <div id="benchmark1">TS Time: {this.state.tsTime}ms</div>
                    <div id="benchmark2">Wasm Time: {this.state.wasmTime}ms</div>
                </div>
            </div>
        );
    }
}

