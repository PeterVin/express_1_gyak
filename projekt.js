const express = require('express');
const app = express();

let todoIndex = 0;
let todos = [{id: todoIndex, name: 'valaki', description: 'valami', status: 'new', author: 'anonymous'}];

const rootHandler = (req, res) => {
  console.log(req.params);
  res.json({status: 'ok', id: req.params.id });
};

const todoIndexHandler = (req, res) => {
  res.json(todos);
}

const todoCreateHandler = (req, res) => { // /todos POST
  console.log(req.body);
  const todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    author: 'anonymous'
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
}

const todoShowHandler = (req, res) => {
  for (let todo of todos) { // for ciklus
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo);
    }
  }
  res.json({});
};

const todoUpdateHandler = (req, res) => {
  for (let todo of todos) {
    if (todo.id === parseInt(req.params.id)) { 
      todo.name = req.body.name;
      todo.status = req.body.status;
      todo.description = req.body.description;
      return res.status(203).json(todo);
    }
  }
  return res.status(200).json({});
}

const todoDeleteHandler = (req, res) => {
  for (let index = 0; index < todos.length; index ++) {
    const todo = todos[index]
    if (todo.id === parseInt(req.params.id)) { 
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
}

app.use(express.json());
app.get('/', rootHandler);
app.get('/todos', todoIndexHandler);


app.post('/todos', todoCreateHandler); //Create
app.get('/todos/:id', todoShowHandler); // Read
app.put('/todos/:id', todoUpdateHandler); // Update
app.delete('/todos/:id', todoDeleteHandler); // Delete

//CRUD metódusai

// nodemon

app.listen(3020);
