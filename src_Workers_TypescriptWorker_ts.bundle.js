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

/***/ "./src/Workers/TypescriptWorker.ts":
/*!*****************************************!*\
  !*** ./src/Workers/TypescriptWorker.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bubbleSort_bubbleSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bubbleSort/bubbleSort */ \"./src/bubbleSort/bubbleSort.ts\");\n/* harmony import */ var _quickSort_quickSort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../quickSort/quickSort */ \"./src/quickSort/quickSort.ts\");\n/* harmony import */ var _shellSort_shellSort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shellSort/shellSort */ \"./src/shellSort/shellSort.ts\");\n/* harmony import */ var _heapSort_heapSort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../heapSort/heapSort */ \"./src/heapSort/heapSort.ts\");\n/* harmony import */ var _correctness__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./correctness */ \"./src/Workers/correctness.ts\");\n\n\n\n\n\n/* eslint-disable-next-line no-restricted-globals */\nself.addEventListener('message', (event) => {\n    let tag = event.data[0];\n    let array = event.data[1];\n    let sort;\n    switch (tag) {\n        case 'bubbleSort':\n            sort = _bubbleSort_bubbleSort__WEBPACK_IMPORTED_MODULE_0__.bubbleSort;\n            break;\n        case 'quickSort':\n            sort = _quickSort_quickSort__WEBPACK_IMPORTED_MODULE_1__.quickSort;\n            break;\n        case 'shellSort':\n            sort = _shellSort_shellSort__WEBPACK_IMPORTED_MODULE_2__.shellSort;\n            break;\n        case 'heapSort':\n            sort = _heapSort_heapSort__WEBPACK_IMPORTED_MODULE_3__.heapSort;\n            break;\n        default: //shouldn't ever hit this \n            console.log('The selected algorithm hasn\\'t been implemented in a typescript worker yet');\n            console.log('Please feel free to submit a PR if you feel motivated to do so :)');\n            sort = (array) => {\n                return array;\n            };\n    }\n    let time = new Date().getTime();\n    array = sort(array);\n    time = new Date().getTime() - time;\n    let correct = (0,_correctness__WEBPACK_IMPORTED_MODULE_4__.isCorrect)(array);\n    /* eslint-disable-next-line no-restricted-globals */\n    self.postMessage([time, correct]);\n});\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/TypescriptWorker.ts?");

/***/ }),

/***/ "./src/Workers/correctness.ts":
/*!************************************!*\
  !*** ./src/Workers/correctness.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isCorrect\": () => (/* binding */ isCorrect)\n/* harmony export */ });\nfunction isCorrect(arr) {\n    if (arr.length < 1)\n        console.log(\"isCorrect was asked to check an empty array!\");\n    for (let i = 0; i < arr.length - 1; i++) {\n        if (arr[i] > arr[i + 1])\n            return false;\n    }\n    return true;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/correctness.ts?");

/***/ }),

/***/ "./src/bubbleSort/bubbleSort.ts":
/*!**************************************!*\
  !*** ./src/bubbleSort/bubbleSort.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bubbleSort\": () => (/* binding */ bubbleSort)\n/* harmony export */ });\nfunction bubbleSort(array) {\n    for (let i = 0; i < array.length - 1; i++) {\n        for (let j = 0; j < array.length - i - 1; j++) {\n            if (array[j] > array[j + 1]) {\n                let swap = array[j];\n                array[j] = array[j + 1];\n                array[j + 1] = swap;\n            }\n        }\n    }\n    return array;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/bubbleSort/bubbleSort.ts?");

/***/ }),

/***/ "./src/heapSort/heapSort.ts":
/*!**********************************!*\
  !*** ./src/heapSort/heapSort.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"heapSort\": () => (/* binding */ heapSort)\n/* harmony export */ });\nfunction heapSort(array) {\n    if (array.length < 2)\n        return array; //an array of length 1 is already sorted\n    let bound = array.length;\n    heapify(array, bound);\n    while (bound > 1) { //no need to sort final element, it'll already be the smallest\n        swap(array, 0, bound - 1);\n        bound--;\n        heapify_down(array, 0, bound);\n    }\n    return array;\n}\nfunction heapify(array, bound) {\n    for (let i = 1; i < bound; i++) {\n        let parent = Math.floor((i - 1) / 2);\n        if (array[i] > array[parent])\n            heapify_up(array, i, parent);\n    }\n    return array;\n}\nfunction heapify_down(array, parent, bound) {\n    let lchild = parent * 2 + 1;\n    let rchild = parent * 2 + 2;\n    let ptr;\n    while (lchild < bound) {\n        if (array[rchild] > array[lchild] && rchild < bound)\n            ptr = rchild;\n        else\n            ptr = lchild;\n        if (array[parent] < array[ptr])\n            swap(array, parent, ptr);\n        else\n            return;\n        parent = ptr;\n        lchild = parent * 2 + 1;\n        rchild = parent * 2 + 2;\n    }\n}\nfunction heapify_up(array, child, parent) {\n    swap(array, parent, child);\n    child = parent;\n    parent = Math.floor((child - 1) / 2);\n    if (array[child] > array[parent])\n        heapify_up(array, child, parent);\n}\nfunction swap(array, i, j) {\n    let ptr = array[i];\n    array[i] = array[j];\n    array[j] = ptr;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/heapSort/heapSort.ts?");

/***/ }),

/***/ "./src/quickSort/quickSort.ts":
/*!************************************!*\
  !*** ./src/quickSort/quickSort.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"quickSort\": () => (/* binding */ quickSort)\n/* harmony export */ });\nfunction quickSort(array) {\n    if (array.length <= 1)\n        return array;\n    quickSortHelper(array, 0, array.length - 1);\n    return array;\n}\nfunction quickSortHelper(array, start, end) {\n    if (start >= end)\n        return;\n    let part = partition(array, start, end);\n    quickSortHelper(array, start, part);\n    quickSortHelper(array, part + 1, end);\n}\nfunction partition(array, start, end) {\n    let pivot = array[start];\n    let i = start - 1;\n    let j = end + 1;\n    while (true) {\n        while (true) {\n            if (array[++i] >= pivot)\n                break;\n        }\n        while (true) {\n            if (array[--j] <= pivot)\n                break;\n        }\n        if (i >= j)\n            return j;\n        [array[j], array[i]] = [array[i], array[j]];\n    }\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/quickSort/quickSort.ts?");

/***/ }),

/***/ "./src/shellSort/shellSort.ts":
/*!************************************!*\
  !*** ./src/shellSort/shellSort.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shellSort\": () => (/* binding */ shellSort)\n/* harmony export */ });\nfunction shellSort(array) {\n    let hibbard = []; //hibbard's increments\n    let h = 1;\n    let idx = 1;\n    while (h < array.length) {\n        hibbard.push(h);\n        idx++;\n        h = 2 ^ idx - 1;\n    }\n    hibbard.forEach((gap) => {\n        for (let offset = 0; offset < gap; offset++) { //shell \n            for (let i = offset; i + gap < array.length; i += gap) { //outer loop of bubble\n                for (let j = offset; j < array.length - i - gap; j += gap) {\n                    if (i + gap < array.length) {\n                        if (array[j] > array[j + gap]) {\n                            let swap = array[j];\n                            array[j] = array[j + gap];\n                            array[j + gap] = swap;\n                        }\n                    }\n                }\n            }\n        }\n    });\n    return array;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/shellSort/shellSort.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Workers/TypescriptWorker.ts");
/******/ 	
/******/ })()
;