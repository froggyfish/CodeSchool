const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    name: String,
    description: String,
    done: Boolean,
    deadline: Date,
})

const Todo = mongoose.model("Todo", TodoSchema)

let store = {}

module.exports = {
    Todo,
    store,
};