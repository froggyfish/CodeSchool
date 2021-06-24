
const server = require("./server");
const persist = require("./persist");

//define a port
const portNumber = process.argv[2] || process.env.PORT || 8080;
persist.connect(()=>{
    //start the server
    server.listen(portNumber, ()=>{
        console.log(`running on ${portNumber}`);
    })
});

