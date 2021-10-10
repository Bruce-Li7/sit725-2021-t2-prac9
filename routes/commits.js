var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");


router.get('/', (req, res) => {
    Controllers.commitsController.getCommits(res);
})

router.post('/', (req, res) => {
    Controllers.commitsController.createCommit(req.body, res); 
})


module.exports = router;