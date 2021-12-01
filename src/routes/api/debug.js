const router = require('express').Router();
const User = require('../../models/user');
const Bin = require('../../models/bin');


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
