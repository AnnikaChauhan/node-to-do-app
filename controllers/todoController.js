let data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Code'}];
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-cadcf.gcp.mongodb.net/test?retryWrites=true&w=majority');

// create schema - this is like a blueprint for data
var todoSchema = new mongoose.Schema({
    item: String
})

// create a todo model, with the model name and the schema it is based on

var Todo = mongoose.model('Todo', todoSchema);
//test item created of type Todo, once you do nodemon app it will push this into the database
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
})

module.exports = function(app){

    app.get('/todo', (req,res) => {
        res.render('todo', {todos: data});
    });

    app.post('/todo', (req,res) => {
        data.push(req.body);
        res.json({todos: data});
    });

    app.delete('/todo/:item', (req,res) => {
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.json({todos: data});
    });
}