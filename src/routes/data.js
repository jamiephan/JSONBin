const express = require('express');
const Bin = require("../models/bin");
const router = express.Router();

router.get("/:name", (req, res) => {
    Bin.findOne({ name: req.params.name }, (err, bin) => {
        if (!bin) {
            res.status(404).send({ error: 404, message: "Bin not found" })
        } else {
            res.send(bin.data)
        }
    })
})

module.exports = router