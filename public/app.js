// Make connection between client and server

// we have access to the io variable
// socket in server.js is backend 'socket' - this one is front end 'socket'

// var socket = io.connect('http://localhost:1337');
var socket = io();

// Query DOM
// query the dom and store the variables for the inputs - username and message
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function () {
    // send the information down to the websocke to the server
    // emit method takes two parameters, name of message, and what is the data (object)
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

// LISTEN to key press event in messages
// and send the server the name of the person typing
// alert server and server will broadcast to all other users
message.addEventListener('keypress', function(){
        socket.emit('typing', handle.value);
    
});


// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';

});



