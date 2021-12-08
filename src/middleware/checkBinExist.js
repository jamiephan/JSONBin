const Bin = require("../models/bin");
const ServerErrorResponse = require("../Responses/ServerError")
const NotFoundResponse = require("../Responses/NotFound")

module.exports = function (req, res, next) {
    Bin.findOne({ name: req.params.name }, (err, bin) => {
        if (err) return ServerErrorResponse(res);
        if (!bin) return NotFoundResponse(res);

        req.bin = bin;
        next();

    })
}