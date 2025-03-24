// Select elements
const taskNameInput = document.getElementById('task-name');
const taskDescInput = document.getElementById('task-desc');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const showAllBtn = document.getElementById('show-all');
const showPendingBtn = document.getElementById('show-pending');
const showCompletedBtn = document.getElementById('show-completed');
const taskDateInput = document.getElementById('task-date');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let hideTasks = true; // Initially, tasks are hidden

// Function to render tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    if (hideTasks) return; // If hideTasks is true, don't display anything

    tasks.forEach((task, index) => {
        if (filter === 'pending' && task.completed) return;
        if (filter === 'completed' && !task.completed) return;

        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong> - ${task.description}
                  <br>📅 Submission Date: <strong>${task.date}</strong>
            </div>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add Task
addTaskBtn.addEventListener('click', () => {
    const name = taskNameInput.value.trim();
    const description = taskDescInput.value.trim();
    const date = taskDateInput.value;

    if (!name) {
        alert("Task name is a mandatory field. Please enter a valid name before proceeding.");
        return;
    }
    if (!description) {
        alert("Description cannot be empty. Kindly provide the necessary details.");
        return;
    }
    if (!date) {
        alert("Please select a submission date.");
        return;
    }

    tasks.push({ name, description, date, completed: false });
    taskNameInput.value = '';
    taskDescInput.value = '';
    taskDateInput.value = '';
    hideTasks = false; // Show tasks after adding
    renderTasks();
});

// Toggle Task Completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Edit Task
function editTask(index) {
    const newName = prompt('Edit Task Name:', tasks[index].name);
    const newDesc = prompt('Edit Task Description:', tasks[index].description);
    const newDate = prompt('Edit Submission Date (YYYY-MM-DD):', tasks[index].date);

    if (newName && newDesc && newDate) {
        tasks[index].name = newName;
        tasks[index].description = newDesc;
        tasks[index].date = newDate;
        renderTasks();
    } else {
        alert("All fields (Task Name, Description, and Date) must be filled!");
    }
}

// Delete Task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Filter Tasks (now also sets `hideTasks` to false to show tasks)
showAllBtn.addEventListener('click', () => {
    hideTasks = false;
    renderTasks('all');
});
showPendingBtn.addEventListener('click', () => {
    hideTasks = false;
    renderTasks('pending');
});
showCompletedBtn.addEventListener('click', () => {
    hideTasks = false;
    renderTasks('completed');
});

// Initial Render - Tasks will be hidden initially
renderTasks();
