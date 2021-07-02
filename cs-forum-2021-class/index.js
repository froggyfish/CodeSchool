const server = require ("./server");
const persist = require("./persist");



const port = process.argv[2] || 8080;

persist(()=>{
    server.listen(port, ()=>{
        console.log(`Code school 2021 forum app running on port: ${port}`)
    })
})