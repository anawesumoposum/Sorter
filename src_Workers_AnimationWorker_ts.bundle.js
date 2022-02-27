/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Sorts/bubbleSort/bubbleSortAnimation.ts":
/*!*****************************************************!*\
  !*** ./src/Sorts/bubbleSort/bubbleSortAnimation.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bubbleSortAnimation\": () => (/* binding */ bubbleSortAnimation)\n/* harmony export */ });\nfunction bubbleSortAnimation(array) {\n    let animations = [];\n    for (let i = 0; i < array.length - 1; i++) {\n        for (let j = 0; j < array.length - i - 1; j++) {\n            if (array[j] > array[j + 1]) {\n                animations.push({ from: [j, j + 1], to: [j + 1, j] });\n                let swap = array[j];\n                array[j] = array[j + 1];\n                array[j + 1] = swap;\n            }\n        }\n    }\n    return animations;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/Sorts/bubbleSort/bubbleSortAnimation.ts?");

/***/ }),

/***/ "./src/Sorts/heapSort/heapSortAnimation.ts":
/*!*************************************************!*\
  !*** ./src/Sorts/heapSort/heapSortAnimation.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"heapSortAnimation\": () => (/* binding */ heapSortAnimation)\n/* harmony export */ });\nfunction heapSortAnimation(array) {\n    let animations = [];\n    if (array.length < 2)\n        return animations; //an array of length 1 is already sorted\n    let bound = array.length;\n    heapify(array, bound, animations);\n    while (bound > 1) { //no need to sort final element, it'll already be the smallest\n        swap(array, 0, bound - 1, animations);\n        bound--;\n        heapify_down(array, 0, bound, animations);\n    }\n    return animations;\n}\nfunction heapify(array, bound, animations) {\n    for (let i = 1; i < bound; i++) {\n        let parent = Math.floor((i - 1) / 2);\n        if (array[i] > array[parent])\n            heapify_up(array, i, parent, animations);\n    }\n    return array;\n}\nfunction heapify_down(array, parent, bound, animations) {\n    let lchild = parent * 2 + 1;\n    let rchild = parent * 2 + 2;\n    let ptr;\n    while (lchild < bound) {\n        if (array[rchild] > array[lchild] && rchild < bound)\n            ptr = rchild;\n        else\n            ptr = lchild;\n        if (array[parent] < array[ptr])\n            swap(array, parent, ptr, animations);\n        else\n            return;\n        parent = ptr;\n        lchild = parent * 2 + 1;\n        rchild = parent * 2 + 2;\n    }\n}\nfunction heapify_up(array, child, parent, animations) {\n    swap(array, parent, child, animations);\n    child = parent;\n    parent = Math.floor((child - 1) / 2);\n    if (array[child] > array[parent])\n        heapify_up(array, child, parent, animations);\n}\nfunction swap(array, i, j, animations) {\n    let ptr = array[i];\n    array[i] = array[j];\n    array[j] = ptr;\n    animations.push({ from: [i, j], to: [j, i] });\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/Sorts/heapSort/heapSortAnimation.ts?");

/***/ }),

/***/ "./src/Sorts/insertionSort/insertionSortAnimation.ts":
/*!***********************************************************!*\
  !*** ./src/Sorts/insertionSort/insertionSortAnimation.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"insertionSortAnimation\": () => (/* binding */ insertionSortAnimation)\n/* harmony export */ });\nconst insertionSortAnimation = (array) => {\n    let animations = [];\n    if (array.length < 2)\n        return animations; //already sorted or empty\n    let i = 1;\n    while (i < array.length) {\n        let j = i;\n        while (j > 0 && array[j - 1] > array[j]) {\n            swap(array, animations, j - 1, j--);\n        }\n        i++;\n    }\n    return animations;\n};\nconst swap = (array, animations, a, b) => {\n    let temp = array[a];\n    array[a] = array[b];\n    array[b] = temp;\n    animations.push({ from: [a, b], to: [b, a] });\n};\n\n\n//# sourceURL=webpack://sorter_browser/./src/Sorts/insertionSort/insertionSortAnimation.ts?");

/***/ }),

/***/ "./src/Sorts/mergeSort/mergeSortAnimation.ts":
/*!***************************************************!*\
  !*** ./src/Sorts/mergeSort/mergeSortAnimation.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mergeSortAnimation\": () => (/* binding */ mergeSortAnimation)\n/* harmony export */ });\n//This is going to be a bottom up, circular queue, natural (exploits natural runs) merge sort. Also I'm going to do forwards and reverse runs.\n//Why? I got bored. \nconst mergeSortAnimation = (array) => {\n    let animations = [];\n    if (array.length <= 1)\n        return animations; //already sorted\n    let maxlen = array.length;\n    let node = convertToLists(array, animations); //I'm always going to have at least one ListNode in node\n    while (node.next !== null) //while there is more than 1 node\n        node = merge(node, node.next, animations, maxlen);\n    //problem that the raw sort doesn't have: the offset won't necessarily be 0; \n    //the final suriving ListNode may be the last one for all I know since I made it circular\n    //we need one final animation frame to shift the array around until offset is 0 again\n    if (node.offset !== 0)\n        animations.push({ from: [...Array(node.array.length).keys()].map(i => (i + node.offset) % node.array.length),\n            to: [...Array(node.array.length).keys()].map(i => i) });\n    return animations;\n};\nconst merge = (a, b, animations, maxlen) => {\n    //insertion sort for O(a+b)\n    let i = 0;\n    let j = 0;\n    let k = 0;\n    let merged = new Array(a.array.length + b.array.length); //faster than realloc\n    //animation frames\n    let from = [];\n    let to = [];\n    while (true) {\n        if (i < a.array.length && j < b.array.length) {\n            if (a.array[i] <= b.array[j]) { //stable\n                merged[k] = a.array[i];\n                to.push((a.offset + k++) % maxlen);\n                from.push((a.offset + i++) % maxlen);\n            }\n            else {\n                merged[k] = b.array[j];\n                to.push((a.offset + k++) % maxlen);\n                from.push((b.offset + j++) % maxlen);\n            }\n        }\n        else if (i < a.array.length) {\n            merged[k] = a.array[i];\n            to.push((a.offset + k++) % maxlen);\n            from.push((a.offset + i++) % maxlen);\n        }\n        else if (j < b.array.length) {\n            merged[k] = b.array[j];\n            to.push((a.offset + k++) % maxlen);\n            from.push((b.offset + j++) % maxlen);\n        }\n        else {\n            break;\n        }\n    }\n    a.array = merged;\n    animations.push({ from: from, to: to });\n    //repair ListNode a, get rid of b\n    if (b.next === a) //no self refs allowed\n        a.next = null;\n    else\n        a.next = b.next;\n    delete b.array; //apparently I can't actually delete memory\n    delete b.next; //but I can break all refs and tell the GC to pick it up\n    if (a.next === null) //this lets me keep the main loop a one-liner, which I just love\n        return a;\n    return a.next;\n};\nconst convertToLists = (arr, animations) => {\n    let i = 0;\n    let node = { array: [arr[i++]], next: null, offset: 0 }; //head with single value to begin, usually I like dummy heads, but this is circular so that gets messy\n    let head = node; //hang on to the head for later\n    while (i < arr.length) {\n        let newNode = { array: [arr[i++]], next: null, offset: node.offset + node.array.length };\n        node.next = newNode;\n        node = newNode;\n        if (i === arr.length)\n            break;\n        if (arr[i] >= node.array[0])\n            i = forwardRun(arr, node, i);\n        else\n            i = reverseRun(arr, node, i, animations);\n    }\n    if (node !== head) //if there is more than 1 list\n        node.next = head; //make into a circle\n    return head;\n};\nconst forwardRun = (arr, node, i) => {\n    while ((i < arr.length) && (arr[i] >= node.array[node.array.length - 1]))\n        node.array.push(arr[i++]);\n    return i;\n};\nconst reverseRun = (arr, node, i, animations) => {\n    while ((i < arr.length) && (arr[i] <= node.array[node.array.length - 1]))\n        node.array.push(arr[i++]);\n    node.array.reverse();\n    let frame = { from: [...Array(node.array.length).keys()].map(i => i + node.offset), to: [...Array(node.array.length).keys()].map(i => i + node.offset).reverse() };\n    animations.push(frame);\n    return i;\n};\n\n\n//# sourceURL=webpack://sorter_browser/./src/Sorts/mergeSort/mergeSortAnimation.ts?");

/***/ }),

/***/ "./src/Sorts/quickSort/quickSortAnimation.ts":
/*!***************************************************!*\
  !*** ./src/Sorts/quickSort/quickSortAnimation.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"quickSortAnimation\": () => (/* binding */ quickSortAnimation)\n/* harmony export */ });\nfunction quickSortAnimation(array) {\n    let animations = [];\n    if (array.length <= 1)\n        return animations;\n    quickSortHelper(array, 0, array.length - 1, animations);\n    return animations;\n}\nfunction quickSortHelper(array, start, end, animations) {\n    if (start >= end)\n        return;\n    let part = partition(array, start, end, animations);\n    quickSortHelper(array, start, part, animations);\n    quickSortHelper(array, part + 1, end, animations);\n}\nfunction partition(array, start, end, animations) {\n    let pivot = array[start];\n    let i = start - 1;\n    let j = end + 1;\n    while (true) {\n        while (true) {\n            if (array[++i] >= pivot)\n                break;\n        }\n        while (true) {\n            if (array[--j] <= pivot)\n                break;\n        }\n        if (i >= j)\n            return j;\n        [array[j], array[i]] = [array[i], array[j]];\n        animations.push({ from: [i, j], to: [j, i] });\n    }\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/Sorts/quickSort/quickSortAnimation.ts?");

/***/ }),

/***/ "./src/Sorts/shellSort/shellSortAnimation.ts":
/*!***************************************************!*\
  !*** ./src/Sorts/shellSort/shellSortAnimation.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shellSortAnimation\": () => (/* binding */ shellSortAnimation)\n/* harmony export */ });\nfunction shellSortAnimation(array) {\n    let hibbard = []; //hibbard's increments\n    let h = 1;\n    let idx = 1;\n    while (h < array.length) {\n        hibbard.push(h);\n        idx++;\n        h = 2 ^ idx - 1;\n    }\n    let animations = [];\n    hibbard.reverse().forEach((gap) => {\n        for (let offset = 0; offset < gap; offset++) { //shell \n            for (let i = offset; i + gap < array.length; i += gap) { //outer loop of bubble\n                for (let j = offset; j < array.length - i - gap; j += gap) {\n                    if (i + gap < array.length) {\n                        if (array[j] > array[j + gap]) {\n                            animations.push({ from: [j, j + gap], to: [j + gap, j] });\n                            let swap = array[j];\n                            array[j] = array[j + gap];\n                            array[j + gap] = swap;\n                        }\n                    }\n                }\n            }\n        }\n    });\n    return animations;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/Sorts/shellSort/shellSortAnimation.ts?");

/***/ }),

/***/ "./src/Workers/AnimationWorker.ts":
/*!****************************************!*\
  !*** ./src/Workers/AnimationWorker.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sorts_bubbleSort_bubbleSortAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Sorts/bubbleSort/bubbleSortAnimation */ \"./src/Sorts/bubbleSort/bubbleSortAnimation.ts\");\n/* harmony import */ var _Sorts_quickSort_quickSortAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Sorts/quickSort/quickSortAnimation */ \"./src/Sorts/quickSort/quickSortAnimation.ts\");\n/* harmony import */ var _Sorts_shellSort_shellSortAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Sorts/shellSort/shellSortAnimation */ \"./src/Sorts/shellSort/shellSortAnimation.ts\");\n/* harmony import */ var _Sorts_heapSort_heapSortAnimation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Sorts/heapSort/heapSortAnimation */ \"./src/Sorts/heapSort/heapSortAnimation.ts\");\n/* harmony import */ var _Sorts_insertionSort_insertionSortAnimation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Sorts/insertionSort/insertionSortAnimation */ \"./src/Sorts/insertionSort/insertionSortAnimation.ts\");\n/* harmony import */ var _Sorts_mergeSort_mergeSortAnimation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Sorts/mergeSort/mergeSortAnimation */ \"./src/Sorts/mergeSort/mergeSortAnimation.ts\");\n\n\n\n\n\n\n/* eslint-disable-next-line no-restricted-globals */\nself.addEventListener('message', (event) => {\n    let tag = event.data[0];\n    let array = event.data[1];\n    let animations;\n    let sort;\n    switch (tag) {\n        case 'bubbleSort':\n            sort = _Sorts_bubbleSort_bubbleSortAnimation__WEBPACK_IMPORTED_MODULE_0__.bubbleSortAnimation;\n            break;\n        case 'quickSort':\n            sort = _Sorts_quickSort_quickSortAnimation__WEBPACK_IMPORTED_MODULE_1__.quickSortAnimation;\n            break;\n        case 'shellSort':\n            sort = _Sorts_shellSort_shellSortAnimation__WEBPACK_IMPORTED_MODULE_2__.shellSortAnimation;\n            break;\n        case 'heapSort':\n            sort = _Sorts_heapSort_heapSortAnimation__WEBPACK_IMPORTED_MODULE_3__.heapSortAnimation;\n            break;\n        case 'insertionSort':\n            sort = _Sorts_insertionSort_insertionSortAnimation__WEBPACK_IMPORTED_MODULE_4__.insertionSortAnimation;\n            break;\n        case 'mergeSort':\n            sort = _Sorts_mergeSort_mergeSortAnimation__WEBPACK_IMPORTED_MODULE_5__.mergeSortAnimation;\n            break;\n        default: //shouldn't ever hit this \n            console.log('The selected algorithm hasn\\'t been implemented in an animation worker yet');\n            console.log('Please feel free to submit a PR if you feel motivated to do so :)');\n            sort = (array) => {\n                return [];\n            };\n    }\n    let time = new Date().getTime();\n    animations = sort(array);\n    time = new Date().getTime() - time;\n    /* eslint-disable-next-line no-restricted-globals */\n    self.postMessage([time, animations]);\n});\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/AnimationWorker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Workers/AnimationWorker.ts");
/******/ 	
/******/ })()
;