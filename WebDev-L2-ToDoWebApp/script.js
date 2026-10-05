const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const clearCompleted = document.getElementById("clearCompleted");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

let currentFilter = "all";


/* =========================
   SAVE TASKS
========================= */

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}


/* =========================
   ADD TASK
========================= */

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    taskInput.focus();

    renderTasks();
}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}


/* =========================
   TOGGLE TASK
========================= */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    renderTasks();
}


/* =========================
   FILTER TASKS
========================= */

function getFilteredTasks() {

    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}


/* =========================
   DISPLAY TASKS
========================= */

function renderTasks() {

    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });


        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "×";

        deleteButton.title = "Delete task";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });


        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });


    updateTaskCount();

    updateEmptyState();
}


/* =========================
   TASK COUNT
========================= */

function updateTaskCount() {

    const activeTasks = tasks.filter(
        task => !task.completed
    ).length;

    taskCount.textContent = activeTasks;
}


/* =========================
   EMPTY STATE
========================= */

function updateEmptyState() {

    if (getFilteredTasks().length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}


/* =========================
   CLEAR COMPLETED
========================= */

clearCompleted.addEventListener("click", () => {

    tasks = tasks.filter(
        task => !task.completed
    );

    saveTasks();

    renderTasks();
});


/* =========================
   FILTER BUTTONS
========================= */

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});


/* =========================
   ADD BUTTON
========================= */

addBtn.addEventListener("click", addTask);


/* =========================
   ENTER KEY
========================= */

taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTask();
    }
});


/* =========================
   INITIAL DISPLAY
========================= */

renderTasks();