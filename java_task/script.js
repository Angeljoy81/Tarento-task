const button = document.querySelector(".toggle-btn");
const body = document.body;

button.addEventListener("click", function () {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        console.log("Dark mode enabled");
    } else {
        console.log("Light mode enabled");
    }
});
