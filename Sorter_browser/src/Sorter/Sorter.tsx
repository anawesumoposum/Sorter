import React from 'react';
import './Sorter.css';

const size = 300;


type SorterState = {
    array: number[];
    didChange: number[];
    tsWorker: Worker,
    tsTime: number,
    wasmWorker: Worker,
    wasmTime: number,
    animationWorker: Worker;
    animationTime: number;
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
            tsWorker: new Worker(new URL("../Workers/TypescriptWorker.ts", import.meta.url)),
            tsTime: 0,
            wasmWorker: new Worker(new URL("../Workers/WasmWorker.ts", import.meta.url)),
            wasmTime: 0,
            animationWorker: new Worker(new URL("../Workers/AnimationWorker.ts", import.meta.url)),
            animationTime: 0,
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
                animations: event.data[1]
            },
                () => this.startViz() 
            );
        };

        // eslint-disable-next-line
        this.state.tsWorker.onmessage = (event: MessageEvent) => {
            console.log('ts worker responded');
            this.setState({
                tsTime: event.data[0],
            });
        }

        // eslint-disable-next-line
        this.state.wasmWorker.onmessage = (event: MessageEvent) => {
            console.log('wasm worker responded');
            this.setState({
                wasmWorker: event.data[0],
            });
        }
    }

    
    /*shouldComponentUpdate(nextState: SorterState) {
        if(this.state.index === nextState.index) return false; //don't rerender
        return true; //rerender
    }*/


    newArray = (): void => {
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
        const selectTag = (document.getElementById("sortSelect")) as HTMLSelectElement; //which algo
        console.log('start workers');
        //typescript benchmark
        this.state.tsWorker.postMessage([selectTag.value, this.state.array]);
        //wasm benchmark courtesy of Rust
        this.state.wasmWorker.postMessage([selectTag.value, this.state.array]);
        //animations
        this.state.animationWorker.postMessage([selectTag.value, this.state.array]); //the worker copies anyway, so this copy may be unecessary
    }


    startViz = (): void => {
        let animations: Animation[] = this.state.animations;
        
        if (animations.length === 0) return; //bad selection or already sorted

        for (let iter = 0; iter < animations.length; iter++) {
            setTimeout(
                () => {
                    let tempArray = this.state.array.slice(0); //google says this is fastest way to copy array
                    let didChange = new Array(size); for (let i=0; i<size; ++i) didChange[i] = 0;   //reset to 0 each time
                    let from = animations[iter].from;
                    let to = animations[iter].to;
                    if (from.length !== to.length) return; //should always be same length and mapping

                    let swap: number[] = [];
                    for (let jter = 0; jter < from.length; jter++) {    //store swap numbers
                        swap.push(tempArray[from[jter]]);
                        didChange[from[jter]] = 1;
                    }
                    for (let jter = 0; jter < swap.length; jter++) {
                        tempArray[to[jter]] = swap[jter];
                    }
                    this.setState({
                        array: tempArray,
                        didChange: didChange
                    });
                }, 
                3//ms to allow eye to follow
            );
        }
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
                <div id='sorterContainer' className="sorterContainer">
                    {bars}
                </div>
                <div>
                    <button onClick={this.newArray}>Reset Random Array</button>
                    <select id="sortSelect">
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value='quickSort'>Quick Sort</option>
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

