/* Global Execution Context */

// When the website is loaded, the browser created a new global object and keyword `this`, even though we have nothing in our file
// In this case, the global object is the winodw of the website

// JS allocates memories for the functions we made
// Because of this, hoisting is possible
// That is, referencing and executing functions before the declaration
// Hoisting a variable is possible with `var`, but the variable will not have any value in it, and thus undefined
// But, if we save the function into variables, then hoisting is not possible

// The creation also creates a scope chain
// Basically, just the creation of scoping of the functions and objects

// After the creation phase, there is also execution phase
// This phase will execute the scripts that we wrote

//----------------------------------------------------------------------------------------------------------------//

/* Callstack */

// JavaScript is a single thread asynchronous programming languages that read the scripts line by line
// Also, there won't be parallel processing of the codes with the asynchronous characteristics

// Callstacks are stacks of commands called for JS to keep track of executions in the program
// If we call a new function, then a new execution context is created and pushed to the stack
// If JS finished executing the function, then the function will be popped from the stack

//----------------------------------------------------------------------------------------------------------------//

/* this */

// A pointer to the objects
// By default, it will refer to the global window object
// The pointer will change the pointer depending on the usage of this pointer
// Can also be used to access DOM elements

// Be careful when declaring new functions, since a new keyword this will be made and this will have other reference
// But, creating functions with arrow functions will not create a new keyword this

//----------------------------------------------------------------------------------------------------------------//

/* Basic Objects */

// In objects, we can store attributes as the state of the objects, can be called properties (props)
// We can also store functions called method in the objects
// We can also store new attributes and methods to the objects even after the initialization

//----------------------------------------------------------------------------------------------------------------//

/* Call, Bind, Apply */

// Bind -> Bind an object to a function so that the this pointer in the function will refer to the bound object
// Can be done by storing the binding to a variable, and in this case the function is not automatically invoked
// const storeHere = storedFunction.bind(boundObject)
// Function with parameters -> storeHere(paramsForTheFunction)

// Call -> Differs from Bind, Call will invoke the function without storing it
// invokedFunction.call(boundObject, paramsInTheInvokedFunction)

// Apply -> Works similarly with Call
// invokedFunction.apply(boundObject, [paramsInTheInvokedFunction])

//----------------------------------------------------------------------------------------------------------------//

/* Object-Oriented */

// Constructor
// Usually made with function, and the name for the function is conventionally uppercase
// To make new objects or instances, we can use the `new` keyword
// `new` will make an empty object and also create the keyword `this`

//----------------------------------------------------------------------------------------------------------------//

/* Prototype */

// Every objects has the property of prototype
// In prototype, we can store methods so that when we create many objects with many methods
// The method in the memory will not be duplicated and will save many memories
// Objects created with the constructor will inherit the methods in the prototype

// There is also wrapper in JS for primitive types such as string (String) or number (Number)
// Strings created with the wrapper will be of type object, instead of string

//----------------------------------------------------------------------------------------------------------------//

/* Prototypal Inheritance */

// To do inheritance, we can use Call to call parent class's constructor and bind the keyword `this` that will refer the child class
// To inherit methods, we can set the child's class prototype with Object.create(parent.prototype)

//----------------------------------------------------------------------------------------------------------------//

/* Class */

// Aside from creating object constructor using function, we can use `Class`
// In the class, we can define the constructor with the `constructor` keyword
// We can also define methods inside the class, and the method will be automatically stored in the prototype

//----------------------------------------------------------------------------------------------------------------//

/* Inheritance */

// To refer the parent class, we can use `super` and store all parameters needed for the parent class constructor
// We should also use the keyword `extends` to the parent class when defining the class name
// Works similarly Java Inheritance
