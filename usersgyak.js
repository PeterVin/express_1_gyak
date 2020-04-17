const express = require('express');
const app = express();

let userid = 0;
let users = [{id: userid, username: 'valaki', email: 'valami@masvalami.com', role: 'admin', password: 'pw'}];

const rootHandler = (req, res) => {
  console.log(req.params);
  res.json({status: 'ok', id: req.params.id });
};

const userIndexHandler = (req, res) => {
  res.json(users);
}

const userCreateHandler = (req, res) => { // /todos POST
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

const userShowHandler = (req, res) => {
  for (let user of users) { // for ciklus
    if (user.id === parseInt(req.params.id)) {
      return res.json(user);
    }
  }
  res.json({});
};

const userUpdateHandler = (req, res) => {
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

const userDeleteHandler = (req, res) => {
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

app.listen(3000);