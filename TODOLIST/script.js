document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null) {
        tasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function taskListClick(event) {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.dataset.index;
        deleteTask(index);
    } else if (event.target.classList.contains("edit-btn")) {
        const index = event.target.dataset.index;
        editTask(index);
    }
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task, index) {
        addTaskToDOM(task, index);
    });
}

function addTaskToDOM(task, index) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="edit-btn" data-index="${index}">Edit</button>
    `;

    taskList.appendChild(li);
}