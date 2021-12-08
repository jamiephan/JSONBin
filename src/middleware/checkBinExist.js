const Bin = require("../models/bin");
const ServerErrorResponse = require("../responses/ServerError")
const NotFoundResponse = require("../responses/NotFound")

module.exports = function (req, res, next) {
    Bin.findOne({ name: req.params.name }, (err, bin) => {
        if (err) return ServerErrorResponse(res);
        if (!bin) return NotFoundResponse(res);

        req.bin = bin;
        next();

    })
}