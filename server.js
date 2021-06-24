// import express
const { application } = require("express");
const express = require("express");
const { Model } = require("mongoose");

const saveM = require("./saveManager");
const app = express();
const {store,Todo} = require("./model");

//function () and ()=> are similar there are differences
//server start

//comment

propertyList = {name:0,id:0,due:0,description:"",done:false};

app.use(express.json({}));

app.use((req,res,next)=>{
    console.log(" | Time: ", Date.now(), " | Method: ", req.method, " | Path: ", req.originalUrl, " | Body: ", req.body, " | ");
    next();
})
// Get - get all
app.get('/',(req,res)=>{
    res.setHeader("Content-Type", "application/json");
    console.log("Doing Something again");

    let findQuery = {};
    for(const property in propertyList){
        if(req.query[property] !== null && req.query[property] !== undefined){
            findQuery[property] = req.query[property];
        }   
    }
    Todo.find(findQuery, function (err, todos) {
        // Check if there was an error
        if(err){
            console.log(`there was an error in listing todos`, err);
            res.status(500).json({message: `unable to list todos`, error: err})
            return;
        }
        res.status(200).send(todos);
    })
})
// Get - get one
app.get('/:id', (req,res)=>{
    if(req.params.id === "save"){
        saveFiles();
    }
    if(req.params.id === "update"){
        updateFiles();
    }
    res.setHeader("Content-Type", "application/json");

    console.log(`${req.params.id}`);

    Todo.findById(req.params.id, (err, todo)=>{
        if(err){
            console.log(`there was an error finding a todo with id ${req.params.id}`, err)
            res.status(500).json({message:`todo with id ${req.params.id} not found`,
                    error: err,
            });
            return;
        }else if (todo === null){
            res.status(404).send(JSON.stringify({error: "not found"}));
            return;
        }
        res.status(200).json(todo);
        //res.send(JSON.stringify(todo));
    });
/*
    if(store[req.params.id] === undefined){
        res.status(404).send(
            JSON.stringify({
                error: "not found",
            })
        )
        return;
    }

    res.send(store[req.params.id]);
*/
});
// Post - post one
app.post('/', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log(`this is a thing body`, req.body);
    Todo.create({
        name: req.body.name,
        description: req.body.description,
        done: req.body.done,
        deadline: req.body.deadline || new Date(),
    }, (err, todo)=>{
        if (err){
            console.log(`unable to create todo`)
            res.status(500).json({message: `Unable to create todo`, error: err})
        }
        res.status(201).json(todo)
    });

});

let nextID = 0;
app.post('/:id', (req,res) =>{
    res.setHeader("Content-Type", "application/json");
    Todo.create({
        name: req.body.name,
        description: req.body.description,
        done: req.body.done,
        deadline: req.body.deadline || new Date(),
    }, (err, todo)=>{
        if (err){
            console.log(`unable to create todo`)
            res.status(500).json({message: `Unable to create todo`, error: err})
        }
        res.status(201).json(todo)
    });
})
// Delete - delete one
app.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.setHeader("Content-Type", "application/json");
    

    Todo.findByIdAndDelete(req.params.id,(err, todo)=>{
        if (err){
            console.log(`unable to delete todo`)
            res.status(500).json({message: `Unable to delete todo`, error: err})
        }
        res.status(202).json(todo);

    })

})
// Patch - update
app.patch('/:id', (req, res) => {

    let updateTodo = {}


    for(const property in propertyList){
        if (req.body[property] !== null && req.body[property] !== undefined){
            updateTodo[property] = req.body[property]
        }
        console.log(updateTodo);
    }

    //patch(store[req.params.id],req.body);

    Todo.updateOne({_id: req.params.id}, {$set: updateTodo}, (err, updateOneResponse)=>{
        if(err){
            console.log(`unable to patch`)
            res.status(500).json({message: `Unable to patch todo`, error: err})

            return;
        }
        if(updateOneResponse.n === 0){
            res.status(404).json({message: `Unable to patch todo: not found`, error: err})

            return;
        }
        res.status(203).json(`${updateOneResponse.nModified} were modified`);
    })

})
// Put - Replace
app.put('/:id', (req, res) => {
    console.log(req.params.id);
    updateTodo = {}

    for(const property in propertyList){
        if (req.body[property] !== null && req.body[property] !== undefined && req.body[property] !== ""){
            updateTodo[property] = req.body[property]
        }
    }
    Todo.updateOne({_id: req.params.id}, {$set: updateTodo}, (err, result)=>{
        if(err){
            res.status(500).json({message: `unable to put todo`, error: err})
            return;
        }
        if(result.n === 0){
            res.status(404).json({message: `unable to put todo: not found`, error:err})
            return;
        }
        res.status(204).json(`${result.nModified} were modified`);
    })
});

function saveFiles(){
    Todo.find({}, function (err, todos) {
        saveM.saveFile(todos);
    })
};
function updateFiles(){
    Todo.find({}, (err, todos) => {
        todos.forEach(function (todoItem){
            Todo.findByIdAndDelete(todoItem.id,(err, todo)=>{
                if (err){
                    console.log(`unable to delete todo`)
                }
            })
        })
    }).then(saveM.getFile(function(data){
        for(var i = 0; i < data.length; i++){
            Todo.create({
                name: data[i].name,
                description: data[i].description,
                done: data[i].done,
                deadline: data[i].deadline || new Date(),
            }, (err, todo)=>{
                if (err){
                    console.log(`unable to create todo`)
                }
            });
        }


    }))
}

function intervalFunc(){
    console.log("happening")
    updateFiles();
}
setInterval(updateFiles, 1500);
module.exports = app;

/**        forEach(function (todoItem) {
            console.log(todoItem)
            Todo.create({
                name: todoItem.name,
                description: todoItem.description,
                done: todoItem.done,
                deadline: todoItem.deadline || new Date(),
            }, (err, todo)=>{
                if (err){
                    console.log(`unable to create todo`)
                }
            });
            console.log("this should be second");
        }) */