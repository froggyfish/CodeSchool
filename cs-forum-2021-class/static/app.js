var app = new Vue ({
    el:"#app",
    vuetify: new Vuetify(),

data:{
    todos:[
        {
            name:"Get groceries",
            description: "Go to this store blah blah",
            done: false,
            editing: false,
            deadline: new Date().toLocaleDateString()
        },
        {
            name:"Mow the lawn",
            description:"N/A",
            done: false,
            editing: false, 
            deadline:  new Date().toLocaleDateString()
        },
        {
            name:"Clean the house",
            description:"The kitchen and living room",
            done: false,
            editing: false,
            deadline: new Date().toLocaleDateString()
        },
        {
            name:"Take dog on walk",
            description:"N/A",
            done: false,
            editing: false,
            deadline: new Date().toLocaleDateString()
        },
    ],
    new_todo_name: "",
    new_todo_description: "",
    new_todo_deadline: "",

    },


methods:{
 
    addNewTodo: function(){
            var new_todo = { 
                name: this.new_todo_name,
                description: this.new_todo_description,
                done: false,
                editing: false, 
                deadline: this.new_todo_deadline
            };
            this.todos.unshift( new_todo );
            this.new_todo = "";
    },
    
    deleteTodo: function ( index ) {
        this.todos.splice(index, 1);
    },


    editTodo: function(todo){
        todo.editing = true;
        // this.$set(todo, 'editing', true);
    },
    saveTodo: function(todo){
        todo.editing = false;

    }
}
});