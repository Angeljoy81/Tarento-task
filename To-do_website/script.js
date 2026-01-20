const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

/* Load saved tasks */
window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        createTask(task.text, task.completed, task.date);
    });
};

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const today = new Date().toDateString();

    createTask(taskText, false, today);
    saveTasks();
    taskInput.value = "";
}

function createTask(text, completed, date) {

    let dateSection = document.getElementById(date);

    if (!dateSection) {
        dateSection = document.createElement("div");
        dateSection.id = date;

        const dateHeading = document.createElement("h4");
        dateHeading.textContent = date;

        const ul = document.createElement("ul");

        dateSection.appendChild(dateHeading);
        dateSection.appendChild(ul);
        taskList.appendChild(dateSection);
    }

    const ul = dateSection.querySelector("ul");

    const li = document.createElement("li");

    /* Checkbox */
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    /* Task text */
    const span = document.createElement("span");
    span.textContent = text;

    /* Delete button */
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    /* Checkbox change */
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
        saveTasks();
    });


    /* Delete task */
    deleteBtn.onclick = function () {
        li.remove();

        if (ul.children.length === 0) {
            dateSection.remove();
        }

        saveTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input").checked,
            date: li.parentElement.parentElement.id
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add task using Enter key */
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
