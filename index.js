#!/usr/bin/env node

const { addTask, loadTasks, listTasks, updateTask, deleteTask, changeStatus } = require('./taskCLIFunctions')

/* argv
    [
  '/path/to/node',        // Node binary
  '/path/to/task-cli.js',  // Script being executed
  'add',                  // Command
  'Buy groceries'         // Task description
]
*/
const args = process.argv.slice(2);
const command = args[0];

const tasks = loadTasks();
if (!tasks) {
    console.error('Failed to load tasks.');
    process.exit(1);
}
switch (command) {
    case 'add':
        const content = args.slice(1).join(' ');//each word or quoted string is treated as a separate element in the process.argv array.
        if (!content) {
            console.log('Please provide a task description.');
            process.exit(1);
        }
        addTask(tasks, content);
        break;
    case 'list':
        const status = args[1] || null;
        listTasks(tasks, status);
        break;
    case 'update':
        const id = Number(args[1]);
        const description = args.slice(2).join(" ");
        updateTask(tasks, id, description);
        break;
    case 'delete':
        const idToDelete = Number(args[1]);
        deleteTask(tasks, idToDelete);
        break;
    case "mark-in-progress":
        const idToMarkInProgress = Number(args[1]);
        changeStatus(tasks,idToMarkInProgress,"in-progress");
        break;
    case "mark-done" :
        const idToMarkDone = Number(args[1]);
        changeStatus(tasks,idToMarkDone,"done");
        break;
    default:
        console.log('Usage: task-cli <command> [options]');
        console.log('Commands:');
        console.log('  add <task_description> - Add a new task');
        console.log('  update <task_id> <task_description> - update task');
        console.log('  delete <task_id> - delete task');
        console.log('  mark-in-progress <task_id>- mark a task In-Progress');
        console.log('  mark-done <task_id>- mark a task done');
        console.log('  list [status] - List tasks (optional: filter by status)');
        break;
}