const express = require('express');
const cors = require('cors');
const apiKeyValidation = require('../middleware/apiKeyValidation');
const checkBinExist = require("../middleware/checkBinExist")
const Bin = require("../models/bin");
const NotFoundResponse = require("../responses/NotFound");
const InvalidApiKeyResponse = require('../responses/UserInvalidApiKey');
const ServerErrorResponse = require("../responses/ServerError");
const router = express.Router();


// Get Bin Data
router.get("/:name", [checkBinExist, cors()], (req, res) => {
    res.send(req.bin.data)
})

// JSON HTML Viewer
router.get("/:name/view", checkBinExist, (req, res) => {
    res.render("jsonViewer", {
        name: req.bin.name
    })

})


// Delete Bin data, only admin and owner can delete
router.delete("/:name", apiKeyValidation, (req, res) => {
    // Check API Key
    if (!req.user) return InvalidApiKeyResponse(res)

    // Check if bin owner
    Bin.findOne({ name: req.params.name })
        .populate('user')
        .exec((err, bin) => {
            if (err) return ServerErrorResponse(res)
            if (!bin) return NotFoundResponse(res)

            // Anonymous Bin
            if (bin.user === null) return InvalidApiKeyResponse(res)

            if (req.user.isAdmin || (bin.user.email === req.user.email)) {
                bin.remove((err) => {
                    if (err) return ServerErrorResponse(res)
                    return res.json({ message: "Bin deleted" })
                })
            } else {
                return InvalidApiKeyResponse(res)
            }
        })
})


module.exports = router