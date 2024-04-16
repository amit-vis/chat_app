const express = require('express');
const socketIo  = require('socket.io');
const cors = require('cors');
const http = require('http');
const app = express();
const port = 4000 || process.env.PORT;
const server = http.createServer(app);
const io = new socketIo.Server(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

app.use(cors());

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>')
});

io.on('connection', (socket)=>{
    console.log("new connection", socket.id);

    socket.on('send_message', (newMessage)=>{
        io.emit("messages", newMessage);
    });

    socket.on('disconnect', ()=>{
        console.log("Client Disconnected")
    })
})

server.listen(port, (err)=>{
    if(err){
        console.log("server is not listening the port", err)
    }
    console.log("server successfull listen the port", port)
})