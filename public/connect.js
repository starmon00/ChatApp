//Connect with server socket
var socket = io.connect("https://disjoint-set-connecthedots.c9users.io/");

//Get components
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      button = document.getElementById('send'),
      output = document.getElementById('output');

