<h1>Sorter</h1>

<h3>A sorting algorithm visualizer by Eric Sibley</h3>
<h3>Available for viewing on https://ericnsibley.github.io/Sorter/</h3>

<h2>Description:</h2>
<p>This project generates an array of random integers, visualized by using their value as height. Then, using the sorting algorithm chosen by the user, it will call upon multiple subroutines to perform the sort in different languages in parallel. This project also serves as an excuse for me to teach myself Web Assembly.</p>
<p>Currently implemented are TypeScript and Web Assembly that has been compiled from Rust. This is why the project is split into algorithms_in_rust_for_wasm and Sorter_browser</p>

<h2>Challenges:</h2>
<h3>Parallelization:</h3>
<p>- Since the JavaScript event loop in the browser is single-threaded, I achieve this parallelization via use of Web Workers <br>
Learn more at https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers</p>
<h3>Animations vs. Sorting:</h3>
<p>- I decided to use a custom TS type for holding my animations to provide an abstraction that any sorting algorithm can use. The update logic had to be generalized as well so it could handle both a sort that only swaps two elements at a time, and a sort that can swap N elements at a time. To simplify moving this struct into different languages, animations are handled only in TS, and arrays containing the same values are moved into the workers that perform the sorts in parallel. This way, the output of the workers can be compared against what they should be independent of the render loop.  <br>
This facillitates a snappy, interactive test bench for comparing language performance.</p>
<h3>Bundling:</h3>
<p>- Previously, a bundler template such as that provided by create-react-app has done everything I needed it to. However, this time I quickly ran into problems with loading and bundling Web Workers. After trying a few plugins for Webpack 4 (which comes with create-react-app) I decided to move to a completely custom structure without create-react-app and use Webpack 5, which treats Web Workers as first class citizens.</p>
<h3>Why Web Assembly + Web Workers:</h3>
<p>- Two reasons. <br />
0) Beyond superficially performing a test bench across languages, I chose WASM to run in Web Workers because to me, that was the obvious place for them to run. JS strikes me as having great async support, but what if I have large compute costs and don't want to block my main event loop? In most situations I'd want to offload this computation onto another resource such as my server. But what if, for some unforseen reason, I absolutely HAVE to perform this calculation in the client's browser? Or, perhaps WASM is fast enough that I no longer have to pay for my server to perform clients' calculations? <br />
1) I'm looking for good excuses to learn more Rust! As of writing this, I'm still pretty new to the language, and need projects to get myself ready for writing production-ready code.
</p>

<h2>Usage:</h2>
<p>Before you treat this as any other NPM app, first notice that we have a dependency on the locally built Rust-produced WASM. Let's build the WASM first.</p>

<h3>Building WASM</h3>
<p>Inside of /Sorter/algorithms_in_rust_for_wasm

```
wasm-pack build --target bundler
```

This produces our wasm and glue code in /pkg
</p>
<h3>Testing Rust code</h3>
<p>Inside Cargo.toml you'll have to comment out 

```
crate-type = ["cdylib"]
```

to stop producing wasm, and then you can do your normal 

```
cargo build
cargo test
```
</p>
<h3>Building React App</h3>
<p>
Now that we have our local module built, inside of /Sorter/Sorter_browser we can 

```
npm install
npm audit fix
npm run build
npm run start
```

and navigate to http://localhost:8080/Sorter/
</p>

<h3>TODO</h3>
    - resolve: modules in webpack.config.js? 
    <br>
    - wasm isn't currently callable in TS, but works fine on its own. At first I thought it was the loader, but I fixed that. Now I'm not sure 
    <br>
    - getting to the point that I want state management in a separate module, too much logic is too spread around
    <br>
    - add a license, I'm thinking copyleft so GNU GPLv3
    <br>
    - header bar or side bar for routing, once routing is implemented I'll want to host on AWS for a unified portfolio domain and probably serve from Next.js
    <br>
    - dynamic number of bars based on screen size? 
    <br>
    - slider bar for number of bars? 
    <br>
    - way more sorts! 
