const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput= document.getElementById('messageInp')
const messageContainer= document.querySelector(".container")
const chatBox = document.getElementById('container')
const messageBox = document.querySelector(".submit")

const name = prompt('Enter your name to join');
// socket.emit('new-user-joined', name)
if (name === null || name.length <= 3) {
    const h1Element = document.createElement('h1');
    h1Element.classList.add('noAccess');
    h1Element.innerText = 'Sorry, You are not Allowed to access the chat 💬👋';
    chatBox.remove();
    messageBox.remove();
    document.body.appendChild(h1Element);
    alert('Access Denied');
} else {
    alert('Access Granted');
    socket.emit('new-user-joined', name)
}



const append= (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;

}

const appendMessage = (message, user, position) => {
    const messageElement = document.createElement('div');
    const span = document.createElement('span');
    // const i = document.createElement('i');
    const p = document.createElement('p');
    // i.classList.add('fa-solid');
    // i.classList.add('fa-heart');
    p.innerText = message;
    span.innerText = user;
    messageElement.append(span)
    // messageElement.append(i)
    messageElement.append(p);
    messageElement.classList.add(position)
    messageElement.classList.add('message')
    // messageElement.setAttribute('id', id)
    // messageElement.setAttribute('ondblclick', "likedMessage(this.id)");
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    if(message === ""){return}
    appendMessage(message,'You', 'right');
    socket.emit('send' , message);
    messageInput.value = ''
})


socket.on('user-joined' , name=>{
    append(`${name} joined the chat`,'center')
})

socket.on('receive' , data=>{
    appendMessage(data.message,data.name,'left')
})

socket.on('left' , name=>{
    if(name !=null){
    append(`${name} left the chat`,'center')}
})
