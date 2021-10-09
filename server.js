// require('dotenv').config()
var express = require("express");
var app = express();
let dbConnect = require("./dbConnect");

let http = require('http').createServer(app);
let io = require('socket.io')(http);



//routes
let projectsRoute = require("./routes/codes");

var port = process.env.port || 3000;
app.use(express.json());
app.use(express.static(__dirname+'/public'));
// app.use(express.urlencoded({ extened: false }));
app.use("/api/projects", projectsRoute);


app.get("/test", function (request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!");
  });


//socket
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    setInterval(()=>{
      socket.emit('number', parseInt(Math.random()*10));
    }, 3000);
  
  });




http.listen(port, ()=>{
    console.log('Web server running at: http://localhost:3000');
    console.log('Type Ctrl+C to shut down the web server');
});