const socket = io();

const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username;

// Prompt for username on page load
do {
  username = prompt('Please enter your username:');
} while (!username.trim());

socket.emit('join', username);

socket.on('userList', (users) => {
  userList.innerHTML = users.map(user => `<div>${user}</div>`).join('');
});

socket.on('chatMessage', ({ username, message }) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = `${username}: ${message}`;
  chatMessages.appendChild(messageElement);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chatMessage', message);
    messageInput.value = '';
  }
});

messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});
