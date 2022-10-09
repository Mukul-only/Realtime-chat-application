const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput= document.getElementById('messageInp')
const messageContainer= document.querySelector(".container")

const append= (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You ∶ \n ${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value = ''
})
const name = prompt('Enter your name to join')
socket.emit('new-user-joined', name)

socket.on('user-joined' , name=>{
    append(`${name} joined the chat`,'center')
})

socket.on('receive' , data=>{
    append(`${data.name} ∶ \n ${data.message}`,'left')
})

socket.on('left' , name=>{
    append(`${name} left the chat`,'center')
})