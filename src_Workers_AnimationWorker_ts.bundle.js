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

/***/ "./src/Workers/AnimationWorker.ts":
/*!****************************************!*\
  !*** ./src/Workers/AnimationWorker.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bubbleSort_bubbleSortAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bubbleSort/bubbleSortAnimation */ \"./src/bubbleSort/bubbleSortAnimation.ts\");\n/* harmony import */ var _quickSort_quickSortAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../quickSort/quickSortAnimation */ \"./src/quickSort/quickSortAnimation.ts\");\n/* harmony import */ var _shellSort_shellSortAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shellSort/shellSortAnimation */ \"./src/shellSort/shellSortAnimation.ts\");\n/* harmony import */ var _heapSort_heapSortAnimation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../heapSort/heapSortAnimation */ \"./src/heapSort/heapSortAnimation.ts\");\n\n\n\n\n/* eslint-disable-next-line no-restricted-globals */\nself.addEventListener('message', (event) => {\n    let tag = event.data[0];\n    let array = event.data[1];\n    let animations;\n    let sort;\n    switch (tag) {\n        case 'bubbleSort':\n            sort = _bubbleSort_bubbleSortAnimation__WEBPACK_IMPORTED_MODULE_0__.bubbleSortAnimation;\n            break;\n        case 'quickSort':\n            sort = _quickSort_quickSortAnimation__WEBPACK_IMPORTED_MODULE_1__.quickSortAnimation;\n            break;\n        case 'shellSort':\n            sort = _shellSort_shellSortAnimation__WEBPACK_IMPORTED_MODULE_2__.shellSortAnimation;\n            break;\n        case 'heapSort':\n            sort = _heapSort_heapSortAnimation__WEBPACK_IMPORTED_MODULE_3__.heapSortAnimation;\n            break;\n        default: //shouldn't ever hit this \n            console.log('The selected algorithm hasn\\'t been implemented in an animation worker yet');\n            console.log('Please feel free to submit a PR if you feel motivated to do so :)');\n            sort = (array) => {\n                return [];\n            };\n    }\n    let time = new Date().getTime();\n    animations = sort(array);\n    time = new Date().getTime() - time;\n    /* eslint-disable-next-line no-restricted-globals */\n    self.postMessage([time, animations]);\n});\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/AnimationWorker.ts?");

/***/ }),

/***/ "./src/bubbleSort/bubbleSortAnimation.ts":
/*!***********************************************!*\
  !*** ./src/bubbleSort/bubbleSortAnimation.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bubbleSortAnimation\": () => (/* binding */ bubbleSortAnimation)\n/* harmony export */ });\nfunction bubbleSortAnimation(array) {\n    let animations = [];\n    for (let i = 0; i < array.length - 1; i++) {\n        for (let j = 0; j < array.length - i - 1; j++) {\n            if (array[j] > array[j + 1]) {\n                animations.push({ from: [j, j + 1], to: [j + 1, j] });\n                let swap = array[j];\n                array[j] = array[j + 1];\n                array[j + 1] = swap;\n            }\n        }\n    }\n    return animations;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/bubbleSort/bubbleSortAnimation.ts?");

/***/ }),

/***/ "./src/heapSort/heapSortAnimation.ts":
/*!*******************************************!*\
  !*** ./src/heapSort/heapSortAnimation.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"heapSortAnimation\": () => (/* binding */ heapSortAnimation)\n/* harmony export */ });\nfunction heapSortAnimation(array) {\n    let animations = [];\n    if (array.length < 2)\n        return animations; //an array of length 1 is already sorted\n    let bound = array.length;\n    heapify(array, bound, animations);\n    while (bound > 1) { //no need to sort final element, it'll already be the smallest\n        swap(array, 0, bound - 1, animations);\n        bound--;\n        heapify_down(array, 0, bound, animations);\n    }\n    return animations;\n}\nfunction heapify(array, bound, animations) {\n    for (let i = 1; i < bound; i++) {\n        let parent = Math.floor((i - 1) / 2);\n        if (array[i] > array[parent])\n            heapify_up(array, i, parent, animations);\n    }\n    return array;\n}\nfunction heapify_down(array, parent, bound, animations) {\n    let lchild = parent * 2 + 1;\n    let rchild = parent * 2 + 2;\n    let ptr;\n    while (lchild < bound) {\n        if (array[rchild] > array[lchild] && rchild < bound)\n            ptr = rchild;\n        else\n            ptr = lchild;\n        if (array[parent] < array[ptr])\n            swap(array, parent, ptr, animations);\n        else\n            return;\n        parent = ptr;\n        lchild = parent * 2 + 1;\n        rchild = parent * 2 + 2;\n    }\n}\nfunction heapify_up(array, child, parent, animations) {\n    swap(array, parent, child, animations);\n    child = parent;\n    parent = Math.floor((child - 1) / 2);\n    if (array[child] > array[parent])\n        heapify_up(array, child, parent, animations);\n}\nfunction swap(array, i, j, animations) {\n    let ptr = array[i];\n    array[i] = array[j];\n    array[j] = ptr;\n    animations.push({ from: [i, j], to: [j, i] });\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/heapSort/heapSortAnimation.ts?");

/***/ }),

/***/ "./src/quickSort/quickSortAnimation.ts":
/*!*********************************************!*\
  !*** ./src/quickSort/quickSortAnimation.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"quickSortAnimation\": () => (/* binding */ quickSortAnimation)\n/* harmony export */ });\nfunction quickSortAnimation(array) {\n    let animations = [];\n    if (array.length <= 1)\n        return animations;\n    quickSortHelper(array, 0, array.length - 1, animations);\n    return animations;\n}\nfunction quickSortHelper(array, start, end, animations) {\n    if (start >= end)\n        return;\n    let part = partition(array, start, end, animations);\n    quickSortHelper(array, start, part, animations);\n    quickSortHelper(array, part + 1, end, animations);\n}\nfunction partition(array, start, end, animations) {\n    let pivot = array[start];\n    let i = start - 1;\n    let j = end + 1;\n    while (true) {\n        while (true) {\n            if (array[++i] >= pivot)\n                break;\n        }\n        while (true) {\n            if (array[--j] <= pivot)\n                break;\n        }\n        if (i >= j)\n            return j;\n        [array[j], array[i]] = [array[i], array[j]];\n        animations.push({ from: [i, j], to: [j, i] });\n    }\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/quickSort/quickSortAnimation.ts?");

/***/ }),

/***/ "./src/shellSort/shellSortAnimation.ts":
/*!*********************************************!*\
  !*** ./src/shellSort/shellSortAnimation.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"shellSortAnimation\": () => (/* binding */ shellSortAnimation)\n/* harmony export */ });\nfunction shellSortAnimation(array) {\n    let hibbard = []; //hibbard's increments\n    let h = 1;\n    let idx = 1;\n    while (h < array.length) {\n        hibbard.push(h);\n        idx++;\n        h = 2 ^ idx - 1;\n    }\n    let animations = [];\n    hibbard.reverse().forEach((gap) => {\n        for (let offset = 0; offset < gap; offset++) { //shell \n            for (let i = offset; i + gap < array.length; i += gap) { //outer loop of bubble\n                for (let j = offset; j < array.length - i - gap; j += gap) {\n                    if (i + gap < array.length) {\n                        if (array[j] > array[j + gap]) {\n                            animations.push({ from: [j, j + gap], to: [j + gap, j] });\n                            let swap = array[j];\n                            array[j] = array[j + gap];\n                            array[j + gap] = swap;\n                        }\n                    }\n                }\n            }\n        }\n    });\n    return animations;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/shellSort/shellSortAnimation.ts?");

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