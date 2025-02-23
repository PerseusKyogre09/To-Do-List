document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    setupKeyboardShortcuts();
    enableDragAndDrop();
    loadTheme(); // Load saved theme
    document.getElementById("toggleTheme").addEventListener("click", toggleTheme);
});

let taskList = [];
let lastDeletedTask = null;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;
    
    if (taskInput.value.trim() === "") return;
    
    const task = {
        id: Date.now(),
        text: taskInput.value,
        priority: priority,
        completed: false  // Save completion state
    };

    taskList.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    taskList.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    taskList.forEach((task) => {
        const li = document.createElement("li");
        li.setAttribute("draggable", true);
        li.dataset.id = task.id;

        // Apply completed class if the task was completed
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text} (${task.priority})</span>
            <button onclick="completeTask(${task.id})">✔</button>
            <button onclick="deleteTask(${task.id})">🗑</button>
        `;
        list.appendChild(li);
    });

    enableDragAndDrop();
}

function completeTask(id) {
    let task = taskList.find(t => t.id === id);
    if (!task) return;

    task.completed = true; // Mark as completed
    saveTasks();
    renderTasks();

    startConfetti();

    let audio = new Audio("assets/sounds/complete.mp3");
    audio.play();

    setTimeout(() => {
        deleteTask(id);
    }, 2000);
}

function deleteTask(id) {
    lastDeletedTask = taskList.find(task => task.id === id);
    taskList = taskList.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function undoDelete() {
    if (lastDeletedTask) {
        taskList.push(lastDeletedTask);
        saveTasks();
        renderTasks();
        lastDeletedTask = null;
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        taskList = JSON.parse(storedTasks);
        renderTasks();
    }
}

function toggleTheme() {
    let themeLink = document.getElementById("theme-link");
    
    if (themeLink.getAttribute("href") === "themes/light.css") {
        themeLink.href = "themes/dark.css";
        localStorage.setItem("theme", "dark");
    } else {
        themeLink.href = "themes/light.css";
        localStorage.setItem("theme", "light");
    }
}

function loadTheme() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.getElementById("theme-link").href = `themes/${savedTheme}.css`;
    }
}
