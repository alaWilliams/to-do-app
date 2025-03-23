require('dotenv').config();
const express = require('express');
const cors = require('cors');
const  todoRouter = require('./routes/todo.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

app.use('/api', todoRouter)


app.listen(port || 3001, () => {
  console.log(`Server running on port ${port}`)});

