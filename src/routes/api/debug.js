const router = require('express').Router();
const User = require('../../models/user');
const Bin = require('../../models/bin');


router.get("/prune", async (req, res) => {
    try {
        await User.deleteMany({});
        console.log("Pruned User")
        await Bin.deleteMany({});
        console.log("Pruned Bin")
        res.json({
            message: "Successfully deleted all users and bins"
        });
    } catch(e){
        console.log(e.message)
        res.status(500).json({
            message: e.message
        });
    }
});
module.exports = router
