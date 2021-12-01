const router = require('express').Router();
const Bin = require('../../models/bin');

// Create a Bin
router.post("/", (req, res) => {
    console.log(req.body);
    const bin = new Bin({
        data: req.body,
    })
    bin.save()
    res.json(bin)
    console.log(bin)
    // console.log(nanoid(9));
})

module.exports = router
