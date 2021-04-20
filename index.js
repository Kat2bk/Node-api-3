const server = require('./server');

const port = 8080; //this is where you would put the process.env.PORT

server.listen(port, (req, res) => {
    console.log(`server is listening on port ${port}`)
})

