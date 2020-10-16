
//Node Server which will handle Socket Io Connections
const io = require('socket.io')(8000)

const users = {}

//if a new user is joins ,let other users are connected to the server.
io.on('connection' , socket =>{
    socket.on('new-user-joined' , name =>{
    users[socket.id] = name;
    socket.broadcast.emit('user joined' ,name);
    });


    //if someone send a message , broadcast it to other people.
    socket.on('send' , message =>{
        socket.broadcast.emit('receive' ,{message : message , name: users[socket.id] })
    });

    //if someone left , then other prople will know
    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left' ,users[socket.id])
        delete users[socket.id];
    });
});
