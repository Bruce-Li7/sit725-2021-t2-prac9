var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");


router.get('/', (req, res) => {
    Controllers.codesController.getCodes(res);
})

router.post('/', (req, res) => {
    Controllers.codesController.createCode(req.body, res);
})


module.exports = router;