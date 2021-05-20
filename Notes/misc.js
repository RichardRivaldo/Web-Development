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
