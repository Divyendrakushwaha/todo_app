var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect("mongodb://test:prince0897@ds233212.mlab.com:33212/todo_1", { useNewUrlParser: true });

//create a schema
var todoSchema = new mongoose.Schema({
	item:String
});

var Todo = mongoose.model('Todo',todoSchema);

//var data=[{item: 'get milk'},{item:'walk dog'}, {item: 'kick some coding'}];

var urlencodedParser= bodyParser.urlencoded({extended:false});

module.exports= function(app){

app.get('/todo', function(req,res){

	Todo.find({},function(err,data)
	{
		if(err) throw err;
		res.render('todo',{todos: data});
	});
	

});


app.post('/todo',urlencodedParser,function(req,res){

	// get data from field and add to database

	var newTodo=Todo(req.body).save(function(err,data){

		if(err) throw err;
		res.json(data);

	});
	

});


app.delete('/todo/:item', function(req,res){

	Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
		if(err) throw err;
		res.json(data);
	});
	
});
}