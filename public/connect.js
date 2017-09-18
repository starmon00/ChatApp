//Connect with server socket
var socket = io.connect("https://disjoint-set-connecthedots.c9users.io/");

//Get DOM components
var messageInput = document.getElementById('messageInput'),
      user = document.getElementById('user'),
      sendButton = document.getElementById('send'),
      displays = document.getElementById('displays'),
      state = document.getElementById('state'),
      floatArea = document.getElementById('floatArea');

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

messageInput.addEventListener('keydown', function(){
    socket.emit('typing', user.value);
})

//Sockets listening for emitted events

//New messages
socket.on("new message", function(data){
    state.innerHTML = "";
    displays.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
    
    console.log("This is from connectjs: ", data)
    // //Check if message should be floated
    // var shouldFloat = data.parsed
    // if (shouldFloat && shouldFloat.length>0){
    //     //Float the messages
    //     shouldFloat.forEach(function(object){
    //         var exist = checkCategoryExist(object.category);
    //         if (!exist) {
    //             //Create new floatBox for category
    //             var floatBox = document.createElement("div");
    //             floatBox.setAttribute("class", "floatBox");
    //             floatBox.setAttribute("id", object.category);
    //             //Add in the name of category
    //             floatBox.textContent = object.category.toUpperCase();
    //             //Add the individual type to box
    //             floatBox.innerHTML = "<li>"+ object.value + "</li>"
    //             floatArea.appendChild(floatBox);
    //         } else {
    //             exist.innerHTML += "<li>"+ object.value + "</li>"
    //         }
    //     })
    // }
});

function checkCategoryExist(category){
    //If the category exists,
    var check = document.querySelectorAll("#"+category);
    if(check.length > 0){
        //returns the corresponding floatBox
        return check[0];
    } else {
        return false;
    }
}

//[{category: "location", value: "Berkeley"},{category: "name", value: "Kevin"}, {category:"location", value:"San Francisco"}]


//Typing events
socket.on('active', function(data){
    state.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

//Scroll Event
var scroller = document.getElementById("chat-window");
scroller.scrollTop = scroller.scrollHeight;

