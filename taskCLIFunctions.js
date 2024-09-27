const fs = require("fs");
const path = require('path')

const taskFilePath = path.join(__dirname, "tasks.json");
//load tasks from json file
const loadTasks = () => {
    if (!fs.existsSync(taskFilePath)) {
        fs.writeFileSync(taskFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(taskFilePath, "utf-8");
    return JSON.parse(data);
}

//save tasks to json
const saveTasks = (data) => {
    //The null parameter: This is a placeholder for the "replacer" function,
    //2 This is the "space" parameter, which controls indentation for the resulting JSON string.
    fs.writeFileSync(taskFilePath, JSON.stringify(data, null, 2));
}
//add tasks
const addTask = (tasks, newTaskDescription) => {
    const newTask = {
        id: tasks.length + 1,
        description: newTaskDescription,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    tasks.push(newTask);
    saveTasks(tasks);
}
//list tasks
const listTasks = (tasks, filter = null) => {
    tasks.forEach((task) => {
        if (!filter || filter === task.status) {
            console.log(task);
        }
    })
}
const updateTask = (tasks, id, content) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.description = content
        task.updatedAt = new Date().toISOString()
        saveTasks(tasks);
    }
    else {
        console.log(`Task with id:${id} not found`);
    }
}
const deleteTask = (tasks, id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        const newTasks = tasks.filter((task) => task.id !== id);
        saveTasks(newTasks);
        console.log(`Task with id${id} deleted`);
    }
    else {
        console.log(`Task with id:${id} not found`);
    }
}

const changeStatus = (tasks, id, newStatus) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.status = newStatus;
        task.updatedAt = new Date().toISOString();
        saveTasks(tasks);
    }
    else {
        console.log(`Task with id:${id} not found`);
    }
}

module.exports = { loadTasks, addTask, listTasks, updateTask, deleteTask, changeStatus };