const router = require('express').Router();
const apiKeyValidation = require('../../middleware/apiKeyValidation');
const Bin = require('../../models/bin');
const ServerErrorResponse = require('../../responses/ServerError');

// Create a Bin
router.post("/", apiKeyValidation ,(req, res) => {

    const bin = new Bin({
        data: req.body,
        user: req.user ? req.user : null
    })
    bin.save((err, bin) => {
        if (err) {
            return ServerErrorResponse(res)
        }
        res.json({
            name: bin.name,
            user: bin.user ? bin.user.email : null,
            data: bin.data
        })
    })
})

module.exports = router
