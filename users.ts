import express, { Request, Response } from 'express';
// const express = require('express');

const app = express();
const port = process.env.API_PORT || 3000;


interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'user'
  password: string
}

const users: Array<User> = [];
let userid: number = 0;

//let userid = 0;
//let users = [{id: userid, username: 'valaki', email: 'valami@masvalami.com', role: 'admin', password: 'pw'}];

const rootHandler = (req: Request, res: Response) => {
  console.log(req.params);
  res.json({status: 'ok', id: req.params.id });
};

const userIndexHandler = (req: Request, res: Response) => {
  res.json(users);
}

const userCreateHandler = (req: Request, res: Response) => { // /todos POST
  console.log(req.body);
  const user = {
    id: userid,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
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
app.get('/user', userIndexHandler);
app.post('/user', userCreateHandler); //Create
app.get('/user/:id', userShowHandler); // Read
app.put('/user/:id', userUpdateHandler); // Update
app.delete('/user/:id', userDeleteHandler); // Delete

app.listen(port, () => {console.log(`I'm listening on ${port}`)});