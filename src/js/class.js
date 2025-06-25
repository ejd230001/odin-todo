let projectArr = [];

class Project {
    constructor(name) {
        this.name = name;
        this.taskArr = [];
    }
}

class Task {
    constructor(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}

function createProject(name) {
    let newProject = new Project(name);
    projectArr.push(newProject);
    localStorage.setItem("projectArr", JSON.stringify(projectArr));

    return newProject;
}

function createTask(project, name, description, date, priority) {
    let newTask = new Task(name, description, date, priority);
    project.taskArr.push(newTask);
    localStorage.setItem("projectArr", JSON.stringify(projectArr));

    return newTask;
}

function removeTask(project, task) {
    const index = project.taskArr.indexOf(task);
    project.taskArr.splice(index, 1);
    localStorage.setItem("projectArr", JSON.stringify(projectArr));
}

function editTask(task, name, description, date, priority) {
    task.name = name;
    task.description = description;
    task.date = date;
    task.priority = priority;
    localStorage.setItem("projectArr", JSON.stringify(projectArr));
}

function getProjectArr() {
    return projectArr;
}

function loadProjectArr() {
    let localArr = JSON.parse(localStorage.getItem("projectArr"));
    console.log(localArr);
    if (localArr != undefined) {
        projectArr = JSON.parse(localStorage.getItem("projectArr"));
        return true;
    }
    console.log("false");
    return false;
}

export {createProject, createTask, removeTask, editTask, getProjectArr, loadProjectArr}

