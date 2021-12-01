const router = require('express').Router();
const apiKeyValidation = require('../../middleware/apiKeyValidation');
const Bin = require('../../models/bin');

// Create a Bin
router.post("/", apiKeyValidation ,(req, res) => {

    const bin = new Bin({
        data: req.body,
        user: req.user ? req.user : null
    })
    bin.save()
    res.json({
        name: bin.name,
        user: bin.user ? bin.user.email : null
    })
})

module.exports = router
