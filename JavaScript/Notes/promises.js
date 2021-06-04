/* AJAX (Asynchronous JavaScript and XML) */

// XML is a lightweight format to send data to servers
// Nowadays we use JSON instead of XML

// Asynchronous JS allows live updating and getting dynamic data for the website without having to refresh the website
// Example: setTimeout, Event Listeners, setInterval, all use Callback functions

// The async things in JS is stored into Web APIs that manage async in JS
// Because of that, the callstack of JS and Web APIs are different
// A line in later index of the file can be executed first because of this

/* Callbacks Importance */

// If we use synchronous and async code at the same time, the sync one might executes first, resulting in undefined behavior
// Because of that, callbacks are used most in the async codes, because callbacks will be executed later on
// Avoid Callback Hell -> Too many nested callback functions on async codes

/* Promises */

// A Promise is basically an object that returns a result of async functions, either on success or on failure
// Call the promise with then, resolve for successful executions and reject for failures
// Catch the errors of failures by chaning catch to the execution
// const promise = new Promise((resolve, reject) => {})
// promise.then(callbacks).catch(error => console.log(error.message))

/* Promise All */

// We use Promise All to executes all promises at the same time
// Because of that, each promise will not have to wait for each other to finish executing.
// Also, the result will have to wait for all of the promises to done executing
// Promise.all([promise1, promise2]).then()
