const router = require('express').Router();
const User = require('../../models/user');
const Bin = require('../../models/bin');

const UserExistResponse = require("../../Responses/UserExist");
const ServerErrorResponse = require("../../Responses/ServerError");
const passwordValidation = require("../../middleware/passwordValidation");
const apiKeyValidation = require('../../middleware/apiKeyValidation');

// Create User
router.post("/", (req, res) => {
    const user = new User(req.body)
    user.save(err => {
        if (err) {
            if (err.code === 11000) {
                return UserExistResponse(res);
            } else {
                return ServerErrorResponse(res);
            }
        } else {
            res.json({ apiKey: user.apiKey })
        }
    })
})

// Login
router.post("/login", passwordValidation, (req, res) => {
    res.json({ apiKey: req.user.apiKey })
})

// Renew API Key
router.post("/renew", passwordValidation, async (req, res) => {
    await req.user.renewApiKey();
    res.json({ apiKey: req.user.apiKey })
})

// List Bins
router.get("/bins", apiKeyValidation, (req, res) => {
    Bin.find({ user: req.user._id })
        .select("name createdAt -_id")
        .exec((err, bins) => {
            if (err) {
                return ServerErrorResponse(res);
            } else {
                res.json(bins);
            }
        })
})


module.exports = router
