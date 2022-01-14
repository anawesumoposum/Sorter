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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bubbleSort_bubbleSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bubbleSort/bubbleSort */ \"./src/bubbleSort/bubbleSort.ts\");\n/* harmony import */ var _quickSort_quickSort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../quickSort/quickSort */ \"./src/quickSort/quickSort.ts\");\n\n\n/* eslint-disable-next-line no-restricted-globals */\nself.addEventListener('message', (event) => {\n    let tag = event.data[0];\n    let array = event.data[1];\n    let sort;\n    switch (tag) {\n        case 'bubbleSort':\n            sort = _bubbleSort_bubbleSort__WEBPACK_IMPORTED_MODULE_0__.bubbleSort;\n            break;\n        case 'quickSort':\n            sort = _quickSort_quickSort__WEBPACK_IMPORTED_MODULE_1__.quickSort;\n            break;\n        default: //shouldn't ever hit this \n            console.log('The selected algorithm hasn\\'t been implemented in a typescript worker yet');\n            console.log('Please feel free to submit a PR if you feel motivated to do so :)');\n            sort = (array) => {\n                return array;\n            };\n    }\n    let time = new Date().getTime();\n    array = sort(array);\n    time = new Date().getTime() - time;\n    /* eslint-disable-next-line no-restricted-globals */\n    self.postMessage([time, array]);\n});\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/TypescriptWorker.ts?");

/***/ }),

/***/ "./src/bubbleSort/bubbleSort.ts":
/*!**************************************!*\
  !*** ./src/bubbleSort/bubbleSort.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bubbleSort\": () => (/* binding */ bubbleSort)\n/* harmony export */ });\nfunction bubbleSort(array) {\n    for (let i = 0; i < array.length - 1; i++) {\n        for (let j = 0; j < array.length - i - 1; j++) {\n            if (array[j] > array[j + 1]) {\n                let swap = array[j];\n                array[j] = array[j + 1];\n                array[j + 1] = swap;\n            }\n        }\n    }\n    return array;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/bubbleSort/bubbleSort.ts?");

/***/ }),

/***/ "./src/quickSort/quickSort.ts":
/*!************************************!*\
  !*** ./src/quickSort/quickSort.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"quickSort\": () => (/* binding */ quickSort)\n/* harmony export */ });\nfunction quickSort(array) {\n    if (array.length <= 1)\n        return array;\n    quickSortHelper(array, 0, array.length - 1);\n    return array;\n}\nfunction quickSortHelper(array, start, end) {\n    if (start >= end)\n        return;\n    let part = partition(array, start, end);\n    quickSortHelper(array, start, part);\n    quickSortHelper(array, part + 1, end);\n}\nfunction partition(array, start, end) {\n    let pivot = array[start];\n    let i = start - 1;\n    let j = end + 1;\n    while (true) {\n        while (true) {\n            if (array[++i] >= pivot)\n                break;\n        }\n        while (true) {\n            if (array[--j] <= pivot)\n                break;\n        }\n        if (i >= j)\n            return j;\n        [array[j], array[i]] = [array[i], array[j]];\n    }\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/quickSort/quickSort.ts?");

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