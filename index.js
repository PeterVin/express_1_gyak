"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const express = require('express');
var app = express_1.default();
var port = process.env.API_PORT || 3100;
var todos = [];
var todoIndex = 0;
var users = [];
var userid = 0;
var rootHandler = function (req, res) {
    console.log(req.params);
    res.json({ status: 'ok', id: req.params.id });
};
var todoIndexHandler = function (req, res) {
    res.json(todos);
};
var todoCreateHandler = function (req, res) {
    console.log(req.body);
    var todo = {
        id: todoIndex,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        authorID: -1
    };
    todos.push(todo);
    todoIndex++;
    res.status(201).json(todo);
};
var todoShowHandler = function (req, res) {
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) { // for ciklus
        var todo = todos_1[_i];
        if (todo.id === parseInt(req.params.id)) {
            return res.json(todo);
        }
    }
    res.json({});
};
var todoUpdateHandler = function (req, res) {
    for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {
        var todo = todos_2[_i];
        if (todo.id === parseInt(req.params.id)) {
            todo.name = req.body.name;
            todo.status = req.body.status;
            todo.description = req.body.description;
            return res.status(203).json(todo);
        }
    }
    return res.status(200).json({});
};
var todoDeleteHandler = function (req, res) {
    for (var index = 0; index < todos.length; index++) {
        var todo = todos[index];
        if (todo.id === parseInt(req.params.id)) {
            todos.splice(index, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
var userCreateHandler = function (req, res) {
    console.log(req.body);
    var user = {
        id: userid,
        username: req.body.username,
        email: req.body.email,
        role: 'user',
        password: Buffer.from(req.body.password).toString('base64')
    };
    users.push(user);
    userid++;
    res.status(201).json(user);
};
var userShowHandler = function (req, res) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) { // for ciklus
        var user = users_1[_i];
        if (user.id === parseInt(req.params.id)) {
            return res.json(user);
        }
    }
    res.json({});
};
var userUpdateHandler = function (req, res) {
    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        if (user.id === parseInt(req.params.id)) {
            user.username = req.body.username;
            user.role = req.body.role;
            user.email = req.body.email;
            user.password = req.body.password;
            return res.status(203).json(user);
        }
    }
    return res.status(200).json({});
};
var userDeleteHandler = function (req, res) {
    for (var index = 0; index < users.length; index++) {
        var user = users[index];
        if (user.id === parseInt(req.params.id)) {
            users.splice(index, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
app.use(express_1.default.json());
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
app.listen(port, function () { console.log("I'm listening on " + port); });
