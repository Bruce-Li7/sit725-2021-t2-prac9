var express = require("express");
var app = express();

users = [];

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extened: false }));

app.get("/user",(req,res) => {
    res.json({statusCode: 202, data: users, message: "Success"})
});

app.post("/user/commit",(req,res) => {
    let userData = {}
    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.comment = req.body.comment;
    users.push(userData);
    res.write('<h1>Thank you for submitting your Feedback!</h1>')
    res.json({statusCode: 202, data: userData, message: "Submitted"})
});


var port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log('Web server running at: http://localhost:3000');
    console.log('Type Ctrl+C to shut down the web server');
});