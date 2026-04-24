const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/studentRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
.then(() => console.log("MongoDB Connected"));

app.use('/', routes);

app.listen(3000, () => console.log("Server running"));