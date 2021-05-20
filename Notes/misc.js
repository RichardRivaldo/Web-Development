/* Deconstruct */

// Allocating array elements into variables
// const items = [x, y, z] -> const [x, y, z] = items
// If we want only a few of them: const [x, ...rest]
// rest will contains the remaining array elements

// Deconstruct Objects
// const obj = {
//     attr1: "val1",
//     attr2: "val2",
//     attr3: "val3",
//     attr4: {
//         attr5: "val5",
//         attr6: "val6",
//     },
// };
// const {attr3} = obj, attr3 = val3
// const {attr5, attr6} = obj.attr4

/* IIFE (Immediately Invoked Function Expression) */

// A function that immediately gets invoked upon declaration
// Mostly found on libraries to prevent the function from making global variables
// Syntax -> (function(){})();

/* Closures */

// function outer(outerVar) {
//     return function inner(innerVar) {
//         console.log(outerVar);
//         console.log(innerVar);
//     };
// }
// const newFunc = outer("Outer");
// newFunc("Inner");

// The inner function always has access to variables and scopes of its outer function
// Even after the variable defined for the outer function is no longer accessible

/* Modules */

// There are 2 methods of import-export in JS

// Default exports -> export only one values or functions from one module with arbitrary names
// export default values
// import values

// Named exports -> export several values or functions from one module with fixed names
// export const values or export {value1, value2}
// import {values as alias}
// Can use alias as to change the values' names
