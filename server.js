require('dotenv').config()
var express = require("express");
var app = express();
const MongoClient = require('mongodb').MongoClient;
let projectCollection;

// Database
const uri = "mongodb+srv://SIT725-week4-prac:devil1126@sit725.1by8m.mongodb.net/SIT725-week4-prac?retryWrites=true&w=majority"
const client = new MongoClient(uri,{ useNewUrlParser: true })


const createCollection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

users = [];

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extened: false }));
// app.use(cors());


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

const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result})
        }
    })
})


var port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log('Web server running at: http://localhost:3000');
    console.log('Type Ctrl+C to shut down the web server');
    createCollection("projects");
});