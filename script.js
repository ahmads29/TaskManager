
    // Load tasks from localStorage when the page loads
window.addEventListener('load', function() {
    sharkawi_displayTasks();
});

function sharkawi_addTask() {
    const taskName = document.getElementById("sharkawi_taskName").value.trim();
    const taskDescription = document.getElementById("sharkawi_taskDescription").value.trim();
    const dueDate = document.getElementById("sharkawi_dueDate").value.trim();

    if (!taskName || !taskDescription || !dueDate) {
        document.getElementById("sharkawi_taskNameRequired").style.display = taskName ? 'none' : 'inline';
        document.getElementById("sharkawi_taskDescriptionRequired").style.display = taskDescription ? 'none' : 'inline';
        document.getElementById("sharkawi_dueDateRequired").style.display = dueDate ? 'none' : 'inline';
        return;
    }

    const tasks = sharkawi_getTasksFromLocalStorage();
    if (sharkawi_isTaskNameUnique(tasks, taskName)) {
        const task = { name: taskName, description: taskDescription, dueDate: dueDate, ongoing: true };
        tasks.push(task);
        sharkawi_saveTasksToLocalStorage(tasks); // Save tasks to localStorage
        sharkawi_openAddTaskSuccessModal();
    } else {
        sharkawi_showModal("Task with the same name already exists!");
    }
}

function sharkawi_openAddTaskSuccessModal() {
    const modal = document.getElementById("sharkawi_addTaskSuccessModal");
    modal.style.display = "block";
}

function sharkawi_closeAddTaskSuccessModal() {
    const modal = document.getElementById("sharkawi_addTaskSuccessModal");
    modal.style.display = "none";
}

function sharkawi_openChangeStatusModal() {
    const modal = document.getElementById("sharkawi_changeStatusModal");
    modal.style.display = "block";
    const changeStatusMessage = document.getElementById("sharkawi_changeStatusMessage");
    changeStatusMessage.textContent = "Task name changed";
}

function sharkawi_closeChangeStatusModal() {
    const modal = document.getElementById("sharkawi_changeStatusModal");
    modal.style.display = "none";
}

function sharkawi_markTaskAsFinished() {
    const taskName = document.getElementById("sharkawi_taskNameInput").value.trim();
    const tasks = sharkawi_getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.name.toLowerCase() === taskName.toLowerCase());
    if (taskIndex !== -1) {
        tasks[taskIndex].ongoing = false;
        sharkawi_saveTasksToLocalStorage(tasks); // Save tasks to localStorage
        sharkawi_closeChangeStatusModal(); // Close the change status modal
        sharkawi_displayTasks(); // Update task list after changing status
        sharkawi_showChangeStatusSuccessMessage(taskName);
    } else {
        sharkawi_showModal("No task with this name found!");
    }
}

function sharkawi_isTaskNameUnique(tasks, name) {
    return !tasks.some(task => task.name.toLowerCase() === name.toLowerCase());
}

function sharkawi_displayTasks() {
    const tasks = sharkawi_getTasksFromLocalStorage();
    const taskList = document.getElementById("sharkawi_taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `Name: ${task.name}, Description: ${task.description}, Due Date: ${task.dueDate}, Status: ${task.ongoing ? "Ongoing" : "Finished"}`;
        taskList.appendChild(li);
    });
}

function sharkawi_showChangeStatusSuccessMessage(taskName) {
    const message = document.getElementById("sharkawi_changeStatusMessage");
    message.textContent = `Task '${taskName}' marked as finished successfully!`;
}

function sharkawi_showModal(message) {
    const modal = document.getElementById("sharkawi_modal");
    const modalMessage = document.getElementById("sharkawi_modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Function to clear all tasks from localStorage
function sharkawi_clearAllTasks() {
    localStorage.removeItem('sharkawi_tasks');
    sharkawi_displayTasks(); // Update the UI to reflect the changes
}

// Function to save tasks to localStorage
function sharkawi_saveTasksToLocalStorage(tasks) {
    localStorage.setItem('sharkawi_tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function sharkawi_getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('sharkawi_tasks')) || [];
}

