const express = require("express");
const todoController = require('./controllers/todoController');
// const bodyParser = require("body-parser");
const app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files for middleware
app.use(express.static('./public'));

//fire controllers
todoController(app);

app.listen(3000);
console.log('listening to port 3000');