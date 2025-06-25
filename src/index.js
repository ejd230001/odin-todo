import "./css/reset.css"
import "./css/styles.css"
import {createProject, createTask, removeTask, editTask, getProjectArr, loadProjectArr} from "./js/class.js"
import {showAddProject, hideAddProject, showAddTask, hideAddTask, showTaskInfo, hideTaskInfo, showTaskEdit, hideTaskEdit} from "./js/modal.js"

let currentProject = null;
let currentTask = null;

function initializePage() {
    setUpEventListeners();

    if(!loadProjectArr()) {
        currentProject = createProject("Default Project");
        createProject("Groceries");
        createProject("Appointments");
        createTask(currentProject, "Do 30 minutes of yoga", "loremalskdfasdflkasjfla", "2004-09-27", "High");
        createTask(currentProject, "Dentist Appointment", "aklsdjlk", "2005-11-11", "High");
        createTask(currentProject, "Buy Bread", "askldjlak", "2005-06-11", "High");
    }
    else
        currentProject = getProjectArr()[0];
    renderProjectList();
    renderCurrentProjectTasks(currentProject);
}

function renderProjectList() {
    const projectListDiv = document.querySelector(".project-list-items");
    projectListDiv.textContent = "";
    getProjectArr().forEach((project) => {
        const newProjectDiv = document.createElement("li");
        newProjectDiv.classList.add("project-item");
        if (currentProject == project)
            newProjectDiv.classList.add("current-project");
        newProjectDiv.textContent = project.name;
        newProjectDiv.projectObject = project;

        newProjectDiv.addEventListener("click", (e) => {
            setCurrentProject(e.target.projectObject);
            renderProjectList();
        })

        projectListDiv.appendChild(newProjectDiv);
    })
}

function renderCurrentProjectTasks(project) {
    let counter = 0;
    const contentDiv = document.querySelector(".content");
    contentDiv.textContent = "";
    
    const projectNameDiv = document.createElement("h1");
    projectNameDiv.classList.add("project-name");
    projectNameDiv.textContent = project.name;

    const taskListHeaderDiv = document.createElement("h2");
    taskListHeaderDiv.classList.add("task-list-header");
    taskListHeaderDiv.textContent = "Task List";

    const taskListDiv = document.createElement("ul");
    taskListDiv.classList.add("task-list");

    contentDiv.append(projectNameDiv, taskListHeaderDiv);

    project.taskArr.forEach((task) => {
        let taskId = "task-" + counter;
        counter += 1;

        const taskDiv = document.createElement("li");
        taskDiv.classList.add("task-item");
        taskDiv.taskObject = task;

        const checkBoxDiv = document.createElement("input");
        checkBoxDiv.setAttribute("type", "checkbox");
        checkBoxDiv.setAttribute("id", taskId);

        const labelDiv = document.createElement("label");
        labelDiv.setAttribute("for", taskId);
        labelDiv.classList.add("task-item-label");

        const customCheckBoxDiv = document.createElement("span");
        customCheckBoxDiv.classList.add("custom-checkbox");

        const taskInfoDiv = document.createElement("div");
        taskInfoDiv.classList.add("task-info");

        const taskTextDiv = document.createElement("div");
        taskTextDiv.classList.add("task-text");
        taskTextDiv.textContent = task.name;

        const taskDueDateDiv = document.createElement("div");
        taskDueDateDiv.classList.add("task-due-date");
        taskDueDateDiv.textContent = task.date;

        const taskEditButton = document.createElement("div");
        taskEditButton.classList.add("task-edit");
        taskEditButton.textContent = "...";
        taskEditButton.addEventListener("click", (e) => {
            console.log(e.target.parentElement);
            currentTask = e.target.parentElement.taskObject;
            showTaskInfo(e, task);
        })

        taskInfoDiv.append(taskTextDiv, taskDueDateDiv);
        labelDiv.append(customCheckBoxDiv, taskInfoDiv);
        taskDiv.append(checkBoxDiv, labelDiv, taskEditButton);
        taskListDiv.append(taskDiv);
        contentDiv.appendChild(taskListDiv);
    })

    const addTaskDiv = document.createElement("div");
    addTaskDiv.classList.add("add-task");
    addTaskDiv.addEventListener("click", showAddTask);

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-task-btn");
    addTaskButton.textContent = "+";

    const addTaskButtonText = document.createElement("div");
    addTaskButtonText.classList.add("add-task-btn-text");
    addTaskButtonText.textContent = "Add task";

    addTaskDiv.append(addTaskButton, addTaskButtonText);
    contentDiv.appendChild(addTaskDiv);
}

function setUpEventListeners() {
    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener("click", showAddProject);

    const cancelAddProjectButton = document.querySelector(".project-add-cancel");
    cancelAddProjectButton.addEventListener("click", hideAddProject);

    const projectAddSubmit = document.querySelector(".project-add-submit");
    projectAddSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        const projectInputName = document.querySelector("#project-add-input-name").value;
        setCurrentProject(createProject(projectInputName));
        renderProjectList();
        hideAddProject(e);
    })

    const cancelAddTaskButton = document.querySelector(".task-add-cancel");
    cancelAddTaskButton.addEventListener("click", hideAddTask);

    const taskAddSubmit = document.querySelector(".task-add-submit");
    taskAddSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        const taskInputName = document.querySelector("#task-add-input-name").value;
        const taskInputDescription = document.querySelector("#task-add-input-description").value;
        const taskInputDate = document.querySelector("#task-add-input-date").value;
        const taskInputPriority = document.querySelector("#task-add-input-priority").value;
        createTask(currentProject, taskInputName, taskInputDescription, taskInputDate, taskInputPriority);
        renderCurrentProjectTasks(currentProject);
        hideAddTask(e);
    })

    const currentTaskCancel = document.querySelector(".current-task-cancel");
    currentTaskCancel.addEventListener("click", hideTaskInfo);

    const currentTaskDelete = document.querySelector(".current-task-delete");
    currentTaskDelete.addEventListener("click", (e) => {
        removeTask(currentProject, currentTask);
        renderCurrentProjectTasks(currentProject);
        hideTaskInfo(e);
    })

    const currentTaskEdit = document.querySelector(".current-task-edit");
    currentTaskEdit.addEventListener("click", (e) => {
        hideTaskInfo(e);
        showTaskEdit(e, currentTask);
    })

    const taskEditCancel = document.querySelector(".task-edit-cancel");
    taskEditCancel.addEventListener("click", hideTaskEdit);

    const taskEditSubmit = document.querySelector(".task-edit-submit");
    taskEditSubmit.addEventListener("click", (e) => {
        const taskEditName = document.querySelector("#task-edit-input-name").value;
        const taskEditDescription = document.querySelector("#task-edit-input-description").value;
        const taskEditDate = document.querySelector("#task-edit-input-date").value;
        const taskEditPriority = document.querySelector("#task-edit-input-priority").value;

        editTask(currentTask, taskEditName, taskEditDescription, taskEditDate, taskEditPriority);
        renderCurrentProjectTasks(currentProject);

        hideTaskEdit(e);
    })
}

function setCurrentProject(project) {
    currentProject = project;
    renderCurrentProjectTasks(currentProject);
}

initializePage();

