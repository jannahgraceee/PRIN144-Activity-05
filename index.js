const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;


let tasks = [
    { id: 1, name: "Task 1", isDone: false },
    { id: 2, name: "Task 2", isDone: false }
];
let taskId = tasks.length;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 1. Get all items
// URL: http://localhost:3000/tasks
app.get('/tasks', (require, response) => {
    response.json(tasks);
});

// 2. Get a specific item by id
// URL: http://localhost:3000/tasks/:id
app.get('/tasks/:id', (require, response) => {
    const id = parseInt(require.params.id);
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
        response.json(task);
    } else {
        response.status(404).send({ message: 'Task not found' });
    }
});

// 3. Create a new item
// URL: http://localhost:3000/tasks
app.post("/tasks", (request, response) => {
    taskId++;
    request.body.id = taskId;
    request.body.isDone = false;
    tasks.push(request.body);
    response.status(201).json();
});

// 4. Update an existing item (Put or Patch)
// URL: http://localhost:3000/tasks/:id
app.patch('/tasks/:id', (require, response) => {
    const id = parseInt(require.params.id);
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
        if (require.body.name) task.name = require.body.name;
        if (require.body.isDone === 'boolean') task.isDone = require.body.isDone;
        response.json(task);
    } else {
        response.status(404).send({ message: 'Task not found' });
    }
});

// 5. Delete a specific item
// URL: http://localhost:3000/tasks/:id
app.delete('/tasks/:id', (require, response) => {
    const id = parseInt(require.params.id);
    const task = tasks.find(task => task.id === id);

    if (task) {
        tasks = tasks.filter(t => t.id !== id); 
        response.status(204).send(); 
    } else {
        response.status(404).send({ message: 'Task not found' }); // Task not found
    }
});