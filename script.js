const tasks = [];
const trashTasks = [];
const deleteButton = document.getElementById('deleteButton');
deleteButton.style.display = 'none';

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

function createTask() {
  const task = {
    text: taskInput.value,
    completed: false,
  };

  tasks.push(task);

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  const text = document.createElement('span');
  text.innerText = task.text;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = function () {
    if (checkbox.checked) {
      taskDiv.classList.add('completed');
      text.style.textDecoration = 'line-through';
      task.completed = true;
    } else {
      taskDiv.classList.remove('completed');
      text.style.textDecoration = 'none';
      task.completed = false;
    }

    const anyChecked = Array.from(
      document.querySelectorAll(".task input[type='checkbox']")
    ).some((input) => input.checked);
    if (anyChecked) {
      deleteButton.style.display = 'inline';
    } else {
      deleteButton.style.display = 'none';
    }
  };

  taskDiv.appendChild(text);
  taskDiv.appendChild(checkbox);

  taskList.appendChild(taskDiv);

  taskInput.value = '';
}
const selectAllCheckbox = document.getElementById('selectAll');

function selectAllTasks() {
  const checkboxes = document.querySelectorAll(".task input[type='checkbox']");
  const textElements = document.querySelectorAll('.task span');

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = selectAllCheckbox.checked;
  });

  if (selectAllCheckbox.checked) {
    deleteButton.style.display = 'inline';
    textElements.forEach(function (textElement) {
      textElement.style.textDecoration = 'line-through';
    });
  } else {
    deleteButton.style.display = 'none';
    textElements.forEach(function (textElement) {
      textElement.style.textDecoration = 'none';
    });
  }
}

function deleteSelected() {
  const checkboxes = document.querySelectorAll(
    ".task input[type='checkbox']:checked"
  );

  checkboxes.forEach(function (checkbox) {
    const taskDiv = checkbox.parentNode;
    const index = tasks.findIndex(function (task) {
      return taskDiv.innerText.includes(task.text);
    });

    if (index !== -1) {
      const task = tasks.splice(index, 1)[0];
      trashTasks.push(task);
      taskDiv.remove();
      deleteButton.style.display = 'none';
      selectAllCheckbox.checked = false;
    }
  });
}

function showTrash() {
  const trashList = document.getElementById('trashList');
  trashList.innerHTML = '';

  trashTasks.forEach(function (task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const text = document.createElement('span');
    text.innerText = task.text;

    const restoreButton = document.createElement('button');
    restoreButton.innerText = 'Restore';
    restoreButton.onclick = function () {
      const index = trashTasks.indexOf(task);
      trashTasks.splice(index, 1);
      tasks.push(task);
      taskDiv.remove();
      createTaskElement(task);
    };

    taskDiv.appendChild(text);
    taskDiv.appendChild(restoreButton);

    trashList.appendChild(taskDiv);
  });

  trashList.style.display = 'block';
}

function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = function () {
    if (checkbox.checked) {
      taskDiv.classList.add('completed');
      text.style.textDecoration = 'line-through';
      task.completed = true;
    } else {
      taskDiv.classList.remove('completed');
      text.style.textDecoration = 'none';
      task.completed = false;
    }

    const anyChecked = Array.from(
      document.querySelectorAll(".task input[type='checkbox']")
    ).some((input) => input.checked);
    if (anyChecked) {
      deleteButton.style.display = 'inline';
    } else {
      deleteButton.style.display = 'none';
    }
  };

  const text = document.createElement('span');
  text.innerText = task.text;

  taskDiv.appendChild(text);
  taskDiv.appendChild(checkbox);

  taskList.appendChild(taskDiv);
}
