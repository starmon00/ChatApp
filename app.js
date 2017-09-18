const express = require("express"),
    app = express(),
    parseMessage = require("./floater");

//Setting up express
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Starts the server
var server = app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening to requests");
});

app.get("/", function(req,res){
    res.render("index");    
});


//Set up web socket
var io = require("socket.io")(server);

io.on("connection", function(socket){
    console.log("New socket connected!");
    
    socket.on('new message', function(data){
        parseMessage(data.message, function(returns){
            data.parsed = returns;
            io.sockets.emit('new message', data);
            console.log("This is the data object: ", data, data.parsed)
        })
    });
    
    socket.on('typing', function(data){
        socket.broadcast.emit('active', data);
    });    
})
