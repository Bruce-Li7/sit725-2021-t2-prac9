const services = require("../services");
let Service = require("../services");

// const getCommits = (res) => {
//     console.log('controller')
//     Service.commitService.getAllCommits(res);
// }

const createCommit = (data, res) => {
    Service.commitService.insertCommit(data,res)
}

module.exports = {
    // getCommits, 
    createCommit
}