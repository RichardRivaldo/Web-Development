/* Map */
// forEach can't return value
// Map can return value to the iterated elements of an array
// Map will always try to return something, so if we use console log then undefined will be the output
// Can be used for modifications or duplications without keeping the references for the original array

/* Find */
// Return ONLY a single element that fulfill the condition of a function
// If no elements found, then undefined is returned

/* Filter */
// Works like Find, but returns multiple values that fulfill the conditions
// If no elements found, then empty array [] is returned
// With Filter, we can use console log and access any objects inside the array

/* Some and Every */
// Check the truth values of an array based on a conditions
// Every -> All elements should fulfill the conditions
// Some -> Only one elements needed to fulfill the conditions

/* Sort */
// Default is sorted ascending, the sorted array will reference the original one
// Works fine for array of strings
// If we sort an array of numbers, then JS will convert the number into string first
// To make it works:
// arrays.sort((a, b) => a - b)
// If the result is positive, `b` will be sorted before `a`
// For descending one, just reverse the return in the function

/* Spread Operators */
// Copy an array without referencing the original array
// const newArray = [...oldArray]
// Can also be used to split a string by each character
// Can also be used to concatenate two arrays
// const concat = [...array1, ...array2] OR [element1, element2, ...anArray]

/* Concat */
// Combine two arrays into one, without referencing the original arrays
