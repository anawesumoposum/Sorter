import React from 'react';
import './Sorter.css';

//const BLUE = 'cornflowerblue';
//const RED = 'firebrick';

type SorterState = {
    array: number[];
    tsWorker: Worker,
    tsTime: number,
    wasmWorker: Worker,
    wasmTime: number,
    animationWorker: Worker;
    animationTime: number;
    animations: Animation[];
}

export type Animation = {
    from: number[];
    to: number[];
}


export default class Sorter extends React.Component<{}, SorterState> {
    constructor(props: any) {
        super(props);

        this.state = {
            array: [],
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
        const array: number[] = [];
        let size = 300;
        for(let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * size + 1));
        }
        this.setState({
            array: array,
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
                    let from = animations[iter].from;
                    let to = animations[iter].to;
                    if (from.length !== to.length) return; //should always be same length and mapping
                    let swap: number[] = [];
                    for (let jter = 0; jter < from.length; jter++) {    //store swap numbers
                        swap.push(tempArray[from[jter]]);
                    }
                    for (let jter = 0; jter < swap.length; jter++) {
                        tempArray[to[jter]] = swap[jter];
                    }
                    this.setState({array: tempArray});
                }, 
                3//ms to allow eye to follow
            );
        }
    }


    render() {
        const bars = this.state.array.map((value, key) => {
            return <div className="bar" key={key} style={{height: value}}>
            </div>;
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

