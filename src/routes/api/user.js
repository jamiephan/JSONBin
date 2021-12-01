const router = require('express').Router();
const User = require('../../models/user');

const UserExistResponse = require("../../Responses/UserExist");
const ServerErrorResponse = require("../../Responses/ServerError");
const passwordValidation = require("../../middleware/passwordValidation");

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

module.exports = router
