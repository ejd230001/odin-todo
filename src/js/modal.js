function showAddProject(e) {
    e.preventDefault();

    const projectAddModal = document.querySelector(".project-add-modal");
    projectAddModal.showModal();
}

function hideAddProject(e) {
    e.preventDefault();

    const projectAddModal = document.querySelector(".project-add-modal");
    projectAddModal.close();

    const projectAddForm = document.querySelector(".project-add-form");
    projectAddForm.reset();
}

function showAddTask(e) {
    e.preventDefault();

    const taskAddModal = document.querySelector(".task-add-modal");
    taskAddModal.showModal();
}

function hideAddTask(e) {
    e.preventDefault();

    const taskAddModal = document.querySelector(".task-add-modal");
    taskAddModal.close();

    const taskAddForm = document.querySelector(".task-add-form");
    taskAddForm.reset();
}

function showTaskInfo(e, task) {
    e.preventDefault();

    const currentTaskNameDiv = document.querySelector(".current-task-name");
    const currentTaskDateDiv = document.querySelector(".current-task-date");
    const currentTaskPriorityDiv = document.querySelector(".current-task-priority");
    const currentTaskDescriptionDiv = document.querySelector(".current-task-description");

    currentTaskNameDiv.textContent = task.name;
    currentTaskDateDiv.textContent = task.date;
    currentTaskPriorityDiv.textContent = task.priority;
    currentTaskDescriptionDiv.textContent = task.description;

    const taskInfoModal = document.querySelector(".task-info-modal");
    taskInfoModal.showModal();
}

function hideTaskInfo(e) {
    e.preventDefault();

    const taskInfoModal = document.querySelector(".task-info-modal");
    taskInfoModal.close();
}

function showTaskEdit(e, task) {
    e.preventDefault();
    
    const taskEditModal = document.querySelector(".task-edit-modal");
    const taskEditName = document.querySelector("#task-edit-input-name");
    const taskEditDescription = document.querySelector("#task-edit-input-description");
    const taskEditDate = document.querySelector("#task-edit-input-date");
    const taskEditPriority = document.querySelector("#task-edit-input-priority");

    taskEditName.value = task.name;
    taskEditDescription.value = task.description;
    taskEditDate.value = task.date;
    taskEditPriority.value = task.priority;

    taskEditModal.showModal();
}

function hideTaskEdit(e) {
    e.preventDefault();

    const taskEditModal = document.querySelector(".task-edit-modal");
    taskEditModal.close();
}

export {showAddProject, hideAddProject, showAddTask, hideAddTask, showTaskInfo, hideTaskInfo, showTaskEdit, hideTaskEdit}