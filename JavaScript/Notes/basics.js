/* Basics */

// When declaring variables with let, we can decide not to assign it a value
// Thus, the variables are undefined, and we can change the value later
// const variables must be initialized with the value, and can't be changed

// To check equalities, == does not check the type of the compared values, but === does
// "1" == 1 -> true
// "1" === -> false
// False values -> [], "", 0, NaN, undefined, null

// We can create a function inside an object, or store a function to a variable
// const thisVariableStore = function(){}

/* Primitive vs Reference Type */

// Reference types are like arrays and objects
// Even if we use const, we can still modify the elements in the array
// What we can't do like primitive types, is reassign the array

// If we reference a new array or objects based on a value:
// const new = old
// When we update `new`, `old` also got updated because the pointer used for the
// reference is the same

/* Ternary Operator */
// Short Version of if-else, same with C or other languages ternary
// (conditions ? whatHappensIfTrue: elseIfWrong)

/* DOM */

// Document Object Model
// ALways generated in the website

// getElement(s)ByX, X can be ID or Class in the HTML -> Return HTMLCollection
// QuerySelector or QuerySelectorAll -> Return NodeList

// children vs childNodes
// classList

// We can use the local and session storage
// Session storage will reset the contents saved into it after a session has ended, i.e. closed or refreshed.
// Local storage is not volatile like session storage

/* Events */

// Use addEventListeners to add a new event
// Can be click, DOMDocumentLoaded
// Specify an anonymous function or a function to execute if the event occurs
// To specify which target is selected during the event, we can use event.target
