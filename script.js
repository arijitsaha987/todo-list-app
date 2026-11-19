const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const count = document.getElementById("count");
const clear = document.getElementById("clear");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    if (tasks[i].done) {
      li.className = "done";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tasks[i].done;
    checkbox.onchange = function () {
      tasks[i].done = !tasks[i].done;
      save();
      showTasks();
    };

    const text = document.createElement("span");
    text.textContent = tasks[i].text;

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.onclick = function () {
      tasks.splice(i, 1);
      save();
      showTasks();
    };

    li.append(checkbox, text, remove);
    list.append(li);
  }

  const left = tasks.filter(function (t) {
    return !t.done;
  }).length;
  count.textContent = left + " tasks left";
}

form.onsubmit = function (e) {
  e.preventDefault();
  tasks.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
  showTasks();
};

clear.onclick = function () {
  tasks = tasks.filter(function (t) {
    return !t.done;
  });
  save();
  showTasks();
};

showTasks();
