const express = require("express"),
    app = express(),
    socket = require("socket.io")

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req,res){
    res.render("index");    
});

//Starts the server
var server = app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening to requests");
});

//Set up web socket
var io = socket(server);

io.on("connection", function(socket){
    console.log("Socket connected!");
    console.log(socket.id);
})