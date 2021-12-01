const router = require('express').Router();
const User = require('../models/user');
const Bin = require('../models/bin');

// Create Post
router.post("/bin", (req, res) => {
    console.log(req.body);
    const bin = new Bin({
        data: req.body,
    })
    bin.save()
    res.json(bin)
    console.log(bin)
    // console.log(nanoid(9));
})

// Create User
router.post("/user", (req, res) => {
    const user = new User(req.body)
    user.save(err => {
        if(err) {
            if(err.code === 11000) {
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
            res.json({apiKey: user.apiKey})
        }
    })
})

// Login
router.post("/user/login", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            res.status(400).json({
                error: "400",
                message: "User could not be found"
            })
        } else {
            if(!user) {
                res.status(400).json({
                    error: "400",
                    message: "User could not be found"
                })
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(err) {
                        res.status(400).json({
                            error: "400",
                            message: "User could not be found"
                        })
                    } else {





// Debug route, will be removed later
router.get("/prune", (req, res) => {
    Bin.deleteMany({}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("bin pruned")
        }
    })
    User.deleteMany({}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("user pruned")
        }
    })
})
module.exports = router
