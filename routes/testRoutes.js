const express = require("express");
const { testController } = require("../controllers/testController");

//router object
const router = express.Router();

//routes
router.get("/", testController);
router.post("/abcs", (req, res) => {
    console.log("Something");
    res.status(201).send();
});

//export
module.exports = router;
