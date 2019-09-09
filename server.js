const express = require('express');
const socket = require('socket.io')

// App setup
const app = express();
const server = app.listen(1337, () => console.log("listening to requests on port 1337"));

// Static files
app.use(express.static(__dirname + "/public"));

// Socket setup
// takes a parameter of the server
// socket server now waits for the client to make connection
const io = socket(server);
// listen for connect event with a browser
// socket passed in - refers to the particular socket that was made
// each connnection has a socket between server & client
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // another listener to an event - typing
    socket.on('typing', function(data){
        // broadcast message to all users other then the user who triggered the socket
        socket.broadcast.emit('typing', data)
    })

});

