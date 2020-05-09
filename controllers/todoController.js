let data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Code'}];

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