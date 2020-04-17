import express, { Request, Response } from 'express';
// const express = require('express');
import { Base64 } from 'js-base64';


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

interface User {
  id: number,
  username: string,
  email: string,
  role: 'admin' | 'user',
  password: string
}

const todos: Array<Todo> = [];
let todoIndex: number = 0;
const users: Array<User> = [];
let userid: number = 0;
 
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

const userCreateHandler = (req: Request, res: Response) => { // /todos POST
  console.log(req.body);
  const user: User = {
    id: userid,
    username: req.body.username,
    email: req.body.email,
    role: 'user',
    password: atob(req.body.password)
  };
  users.push(user);
  userid++;
  res.status(201).json(user);
}

const userShowHandler = (req: Request, res: Response) => {
  for (let user of users) { // for ciklus
    if (user.id === parseInt(req.params.id)) {
      return res.json(user);
    }
  }
  res.json({});
};

const userUpdateHandler = (req: Request, res: Response) => {
  for (let user of users) {
    if (user.id === parseInt(req.params.id)) { 
      user.username = req.body.username;
      user.role = req.body.role;
      user.email = req.body.email;
      user.password = req.body.password;
      return res.status(203).json(user);
    }
  }
  return res.status(200).json({});
}

const userDeleteHandler = (req: Request, res: Response) => {
  for (let index = 0; index < users.length; index ++) {
    const user = users[index]
    if (user.id === parseInt(req.params.id)) { 
      users.splice(index, 1);
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


app.post('/user', userCreateHandler); //Create
app.get('/user/:id', userShowHandler); // Read
app.put('/user/:id', userUpdateHandler); // Update
app.delete('/user/:id', userDeleteHandler); // Delete
//CRUD metódusai

// nodemon

//app.listen(port, () => {console.log("I'm listening on " + port)});
app.listen(port, () => {console.log(`I'm listening on ${port}`)});
