// Express Middleware to check if email/password are valid
const User = require("../models/user");
const UserNotFoundResponse = require("./../responses/UserNotFound");
const ServerErrorResponse = require("./../responses/ServerError");
const UserInvalidPasswordResponse = require("./../responses/UserInvalidPassword");

module.exports = function (req, res, next) {

    // Check if data was passed
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ error: true, message: 'email and password fields are required.' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return ServerErrorResponse(res);
        }
        if (!user) {
            // return UserNotFoundResponse(res);
            return UserInvalidPasswordResponse(res);
        }


        if (!user.comparePassword(req.body.password)) {
            return UserInvalidPasswordResponse(res);
        } else {
            req.user = user;
            return next();
        }

    })

}
