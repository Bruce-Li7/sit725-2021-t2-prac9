require('dotenv').config()
var express = require("express");
var app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;
let projectCollection;

// Database
const uri = "mongodb+srv://sit725-t2-week4:devil1126@sit725.0xbrc.mongodb.net/sit725-t2-week4?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true })


const createCollection = (collectionName) => {
    client.connect((err, db) => {
        projectCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
        }
    })
}


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extened: false }));
// app.use(cors());


const insertProjects = (project, callback) => {
    projectCollection.insert(project, callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

app.get('/api/projects', (req, res) => {
    getProjects((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Success", data: result })
        }
    })
})

app.post('/api/projects', (req, res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Project Successfully added", data: result })
        }
    })
})

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
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);

});


var port = process.env.port || 3000;

http.listen(port, () => {
    console.log('Web server running at: http://localhost:3000');
    console.log('Type Ctrl+C to shut down the web server');
    createCollection("projects");
});