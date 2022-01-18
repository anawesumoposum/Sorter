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

/***/ "../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.js":
/*!****************************************************************************!*\
  !*** ../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.js ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bubble_sort\": () => (/* binding */ bubble_sort)\n/* harmony export */ });\n/* harmony import */ var _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algorithms_in_rust_for_wasm_bg.wasm */ \"../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.wasm\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\nvar WASM_VECTOR_LEN = 0;\nvar cachegetUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {\n    cachegetUint8Memory0 = new Uint8Array(_algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n  }\n\n  return cachegetUint8Memory0;\n}\n\nvar lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\nvar cachedTextEncoder = new lTextEncoder('utf-8');\nvar encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {\n  return cachedTextEncoder.encodeInto(arg, view);\n} : function (arg, view) {\n  var buf = cachedTextEncoder.encode(arg);\n  view.set(buf);\n  return {\n    read: arg.length,\n    written: buf.length\n  };\n};\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n  if (realloc === undefined) {\n    var buf = cachedTextEncoder.encode(arg);\n\n    var _ptr = malloc(buf.length);\n\n    getUint8Memory0().subarray(_ptr, _ptr + buf.length).set(buf);\n    WASM_VECTOR_LEN = buf.length;\n    return _ptr;\n  }\n\n  var len = arg.length;\n  var ptr = malloc(len);\n  var mem = getUint8Memory0();\n  var offset = 0;\n\n  for (; offset < len; offset++) {\n    var code = arg.charCodeAt(offset);\n    if (code > 0x7F) break;\n    mem[ptr + offset] = code;\n  }\n\n  if (offset !== len) {\n    if (offset !== 0) {\n      arg = arg.slice(offset);\n    }\n\n    ptr = realloc(ptr, len, len = offset + arg.length * 3);\n    var view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n    var ret = encodeString(arg, view);\n    offset += ret.written;\n  }\n\n  WASM_VECTOR_LEN = offset;\n  return ptr;\n}\n\nvar cachegetInt32Memory0 = null;\n\nfunction getInt32Memory0() {\n  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {\n    cachegetInt32Memory0 = new Int32Array(_algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n  }\n\n  return cachegetInt32Memory0;\n}\n\nvar lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\nvar cachedTextDecoder = new lTextDecoder('utf-8', {\n  ignoreBOM: true,\n  fatal: true\n});\ncachedTextDecoder.decode();\n\nfunction getStringFromWasm0(ptr, len) {\n  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n/**\n* @param {string} arr\n* @returns {string}\n*/\n\n\nfunction bubble_sort(arr) {\n  try {\n    var retptr = _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);\n\n    var ptr0 = passStringToWasm0(arr, _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);\n    var len0 = WASM_VECTOR_LEN;\n    _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.bubble_sort(retptr, ptr0, len0);\n    var r0 = getInt32Memory0()[retptr / 4 + 0];\n    var r1 = getInt32Memory0()[retptr / 4 + 1];\n    return getStringFromWasm0(r0, r1);\n  } finally {\n    _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);\n\n    _algorithms_in_rust_for_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);\n  }\n}\n\n//# sourceURL=webpack://sorter_browser/../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.js?");

/***/ }),

/***/ "./src/Workers/WasmWorker.ts":
/*!***********************************!*\
  !*** ./src/Workers/WasmWorker.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var algorithms_in_rust_for_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! algorithms_in_rust_for_wasm */ \"../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.js\");\n/* harmony import */ var _correctness__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./correctness */ \"./src/Workers/correctness.ts\");\n\n\n//export {};\n//const wasm = import(\"./asyncLoad.js\")\n//    .catch((e) => console.error(\"Error importing wasm within asyncLoad\", e));\n//const wasm = async () => {\n//    await import(\"algorithms_in_rust_for_wasm\");\n//}\n/* eslint-disable-next-line no-restricted-globals */\nself.addEventListener('message', (event) => {\n    let tag = event.data[0];\n    let array = event.data[1];\n    let sort;\n    switch (tag) {\n        case 'bubbleSort':\n            sort = algorithms_in_rust_for_wasm__WEBPACK_IMPORTED_MODULE_1__.bubble_sort;\n            break;\n        //case 'quickSort':\n        //    sort = quickSortAnimation;\n        //    break;\n        default: //shouldn't ever hit this \n            console.log('The selected algorithm hasn\\'t been implemented in a wasm worker yet');\n            console.log('Please feel free to submit a PR if you feel motivated to do so :)');\n            sort = (array) => {\n                return array;\n            };\n    }\n    let time = new Date().getTime();\n    let temp = JSON.stringify(array);\n    console.log(temp);\n    array = JSON.parse(sort(temp));\n    time = new Date().getTime() - time;\n    let correct = (0,_correctness__WEBPACK_IMPORTED_MODULE_0__.isCorrect)(array);\n    /* eslint-disable-next-line no-restricted-globals */\n    self.postMessage([time, correct]);\n});\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/WasmWorker.ts?");

/***/ }),

/***/ "./src/Workers/correctness.ts":
/*!************************************!*\
  !*** ./src/Workers/correctness.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isCorrect\": () => (/* binding */ isCorrect)\n/* harmony export */ });\nfunction isCorrect(arr) {\n    if (arr.length < 1)\n        console.log(\"isCorrect was asked to check an empty array!\");\n    for (let i = 0; i < arr.length - 1; i++) {\n        if (arr[i] > arr[i + 1])\n            return false;\n    }\n    return true;\n}\n\n\n//# sourceURL=webpack://sorter_browser/./src/Workers/correctness.ts?");

/***/ }),

/***/ "../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.wasm":
/*!******************************************************************************!*\
  !*** ../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.wasm ***!
  \******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.id];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name) exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"\"]()\n\n//# sourceURL=webpack://sorter_browser/../algorithms_in_rust_for_wasm/pkg/algorithms_in_rust_for_wasm_bg.wasm?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Workers/WasmWorker.ts");
/******/ 	
/******/ })()
;