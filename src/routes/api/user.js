const router = require('express').Router();
const User = require('../../models/user');

// Create User
router.post("/", (req, res) => {
    const user = new User(req.body)
    user.save(err => {
        if (err) {
            if (err.code === 11000) {
                res.status(400).json({
                    error: "400",
                    message: "User already exists"
                })
            } else {
                res.status(400).json({
                    error: "400",
                    message: "User could not be created"
                })
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
            res.status(400).json({
                error: "400",
                message: "User could not be found"
            })
        } else {
            if (!user) {
                res.status(400).json({
                    error: "400",
                    message: "User could not be found"
                })
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) {
                        res.status(400).json({
                            error: "400",
                            message: "User could not be found"
                        })
                    } else { }
                })
            }
        }
    })
})

module.exports = router
