const express = require("express");
const todoController = require('./controllers/todoController');
const app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files for middleware
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//fire controllers
todoController(app);

app.listen(3000);
console.log('listening to port 3000');