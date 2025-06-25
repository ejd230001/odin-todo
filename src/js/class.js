let projectArr = [];

class Project {
    constructor(name) {
        this.name = name;
        this.taskArr = [];
    }
}

class Task {
    constructor(project, name, description, date, priority) {
        this.project = project;
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    editTask(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}

function createProject(name) {
    let newProject = new Project(name);
    projectArr.push(newProject);

    return newProject;
}

function createTask(project, name, description, date, priority) {
    let newTask = new Task(project, name, description, date, priority);
    project.taskArr.push(newTask);

    return newTask;
}

function removeTask(project, task) {
    const index = project.taskArr.indexOf(task);
    project.taskArr.splice(index, 1);
}

function editTask(task, name, description, date, priority) {
    task.editTask(name, description, date, priority);
}

function getProjectArr() {
    return projectArr;
}

export {createProject, createTask, removeTask, editTask, getProjectArr}

