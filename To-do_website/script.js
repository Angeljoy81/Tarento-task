const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    createTask(taskText, false);
    saveTasks();
    taskInput.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

