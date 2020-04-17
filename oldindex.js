
const express = require('express');
const app = express();

const logger = (req, res, next) => {
  console.log(req.params);
  next();
};

const rootHandler = (req, res) => {
  console.log(req.params);
  res.json({status: 'ok', id: req.params.id });
};

const secondHandler = (req, res) => {
  console.log(req.params);
  res.json({status: 'cica' });
};

app.use(express.json());
app.use(logger);
app.get('/', rootHandler);
app.get('/cica', secondHandler);

app.get('/:id', rootHandler);

app.listen(3030);