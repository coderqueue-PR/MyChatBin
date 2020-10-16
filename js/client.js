const socket = io('http://localhost:8000')


//Get Dom Element to the Dom variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// mp3 notification tune
var audio = new Audio('ting_tong.mp3');

//function which will append to the container
const append = (message, position) => {

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   
 //mp3 notification condition
    if(position =='left'){
        audio.play();
    }
   
}

const name = prompt("Enter Your Name to Join the Conversation")
socket.emit('new-user-joined', name);

socket.on('user joined', name => {
    append(`${name} join the Chat`, 'right') // he is join the chat
})
socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')   //receive the message
}) 
socket.on('left', name => {
    append(`${name} left the chat`, 'right') //he is left the chat 
})

//if the form is submitted send message to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
