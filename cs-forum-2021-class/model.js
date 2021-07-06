const mongoose = requre("mongoose");

const schema = mongoose.Schema({
    name: String,
    description: String,
    done: Boolean,
    date: Date
})

