const fs = require("fs");

function saveFile(todoList){

    fs.writeFile("./savedTodoList.json", JSON.stringify(todoList), (err)=>{
        if (err){
            throw err;
        }
        console.log("JSON data is saved");
    })
}

function getFile(newFunc){
    

    fs.readFile("./savedTodoList.json", "utf-8", (err, data) =>{
        if(err){
            throw err;
        };
        newFunc(JSON.parse(data));
    })
    return "wowza"
    
}

module.exports = {
    saveFile,
    getFile,
};