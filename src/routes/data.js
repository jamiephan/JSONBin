const express = require('express');
const apiKeyValidation = require('../middleware/apiKeyValidation');
const Bin = require("../models/bin");
const NotFoundResponse = require("../Responses/NotFound");
const InvalidApiKeyResponse = require('../responses/UserInvalidApiKey');
const ServerErrorResponse = require("../Responses/ServerError");
const router = express.Router();


// Get Bin Data
router.get("/:name", (req, res) => {
    Bin.findOne({ name: req.params.name }, (err, bin) => {
        if (!bin) {
            return NotFoundResponse(res)
            // res.status(404).send({ error: 404, message: "Bin not found" })
        } else {
            res.send(bin.data)
        }
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