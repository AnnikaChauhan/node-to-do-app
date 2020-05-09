// let data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Code'}];
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-cadcf.gcp.mongodb.net/test?retryWrites=true&w=majority');

// create schema - this is like a blueprint for data
var todoSchema = new mongoose.Schema({
    item: String
})

// create a todo model (can also be called a collection), with the model name and the schema it is based on
var Todo = mongoose.model('Todo', todoSchema);
//test item created of type Todo, once you do nodemon app it will push this into the database
/*
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
})
*/

module.exports = function(app){

    app.get('/todo', (req,res) => {
        //get data from mongoDB and pass it to the view
        //passing through the empty object in the find gets ALL ITEMS
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', (req,res) => {
        //get data from the view and add it to the database (mongoDB)
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        })
        //these are for the not database one
        // data.push(req.body);
        // res.json({todos: data});
    });

    app.delete('/todo/:item', (req,res) => {
        //delete requested item from mongoDB which is a bit more complex
        // the regex in replace finds the dashes andn replaces them with spaces
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        })
        //this is for the not database one
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // res.json({todos: data});
    });
}