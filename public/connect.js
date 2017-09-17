//Connect with server socket
var socket = io.connect("https://disjoint-set-connecthedots.c9users.io/");

//Get DOM components
var messageInput = document.getElementById('messageInput'),
      user = document.getElementById('user'),
      sendButton = document.getElementById('send'),
      displays = document.getElementById('displays');

//Add event listeners

//Pressing enter
messageInput.addEventListener("keypress", function(key){
    if (key.keyCode === 13){
        socket.emit("new message", {message: messageInput.value, user:user.value})
        messageInput.value = "";
    }
})

//Clicking send button
sendButton.addEventListener('click', function(){
    socket.emit("new message", {message: messageInput.value, user:user.value})
    messageInput.value = "";
});

//Sockets listening for emitted events
socket.on("new message", function(data){
    // feedback.innerHTML = '';
    displays.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});