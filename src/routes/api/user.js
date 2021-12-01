const router = require('express').Router();
const User = require('../../models/user');

const UserExistResponse = require("../../Responses/UserExist");
const UserInvalidPasswordResponse = require("../../Responses/UserInvalidPassword");
const UserNotFoundResponse = require("../../Responses/UserNotFound");
const ServerErrorResponse = require("../../Responses/ServerError");

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
router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return ServerErrorResponse(res);
        }
        if (!user) {
            return UserNotFoundResponse(res);
        }

        if (!user.comparePassword(req.body.password)) {
            return UserInvalidPasswordResponse(res);
        } else {
            res.json({ apiKey: user.apiKey })
        }

    })
})

module.exports = router
