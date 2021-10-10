let client = require("../dbConnect");
let commitsCollection;
setTimeout(() => {
    commitsCollection = client.mongoClient.db().collection("commits");
}, 500)

const getAllCommits = (res) => {
    commitsCollection.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    })
}

const insertCommit = (code, res) => {
    commitsCollection.insertOne(code, (err, result) => {
        console.log('Commit Inserted', result)
        res.send({ result: 400 })
    })
}



module.exports = {
    getAllCommits, insertCommit
}