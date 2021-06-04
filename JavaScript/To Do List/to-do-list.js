// Selectors
const todoInput = document.querySelector(".Todoinput");
const todoButton = document.querySelector(".Todobutton");
const todoList = document.querySelector(".lists");
const filterOption = document.querySelector(".filter-todos");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submitting / refreshing
    event.preventDefault();

    // Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos");

    // Items
    const todoItems = document.createElement("li");
    todoItems.classList.add("todoItems");

    // Get the input box value
    todoItems.innerText = todoInput.value;

    // Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class = "fas fa-check"></i>';
    checkButton.classList.add("checkButton");

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("deleteButton");

    // Append items to the div
    todoDiv.appendChild(todoItems);
    todoDiv.appendChild(checkButton);
    todoDiv.appendChild(deleteButton);

    // Append to ul
    todoList.appendChild(todoDiv);

    // Save todo to Local
    saveToLocal(todoItems.innerText);

    // Clear input box value
    todoInput.value = "";
}

function deleteAndCheck(event) {
    const item = event.target;
    if (item.classList[0] === "deleteButton") {
        const todoLi = item.parentElement;
        todoLi.classList.add("fall");
        removeLocalTodo(todoLi);
        todoLi.addEventListener("transitionend", function () {
            todoLi.remove();
        });
    } else if (item.classList[0] === "checkButton") {
        const todoLi = item.parentElement;
        todoLi.classList.toggle("check");
    }
}

function filterTodo(event) {
    // Check each todo
    const todo = todoList.childNodes;
    todo.forEach(function (todo) {
        // Switch the select list value
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("check")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("check")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveToLocal(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        // Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todos");

        // Items
        const todoItems = document.createElement("li");
        todoItems.classList.add("todoItems");

        // Get the input box value
        todoItems.innerText = todo;

        // Check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class = "fas fa-check"></i>';
        checkButton.classList.add("checkButton");

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
        deleteButton.classList.add("deleteButton");

        // Append items to the div
        todoDiv.appendChild(todoItems);
        todoDiv.appendChild(checkButton);
        todoDiv.appendChild(deleteButton);

        // Append to ul
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
