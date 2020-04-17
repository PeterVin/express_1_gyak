import express, { Request, Response } from 'express';
// const express = require('express');

const app = express();
const port = process.env.API_PORT || 3000;

/*let todoIndex = 0;
let todos = [{id: todoIndex, name: 'valaki', description: 'valami', status: 'new', author: 'anonymous'}];
*/

interface Todo {
  id: number,
  name: string,
  description: string,
  status: 'new' | 'in-progress' | 'done',
  authorID: number,
}

const todos: Array<Todo> = [];
let todoIndex: number = 0;
 
const rootHandler = (req: Request, res: Response) => {
  console.log(req.params);
  res.json({status: 'ok', id: req.params.id });
};

const todoIndexHandler = (req: Request, res: Response) => {
  res.json(todos);
}

const todoCreateHandler = (req: Request, res: Response) => { // /todos POST
  console.log(req.body);
  const todo: Todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    authorID: -1
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
}

const todoShowHandler = (req: Request, res: Response) => {
  for (let todo of todos) { // for ciklus
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo);
    }
  }
  res.json({});
};

const todoUpdateHandler = (req: Request, res: Response) => {
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

const todoDeleteHandler = (req: Request, res: Response) => {
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

//app.listen(port, () => {console.log("I'm listening on " + port)});
app.listen(port, () => {console.log(`I'm listening on ${port}`)});
