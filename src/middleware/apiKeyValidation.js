// Express Middleware to check if email/password are valid
const User = require("./../models/user");
const UserNotFoundResponse = require("./../responses/UserNotFound");
const ServerErrorResponse = require("./../responses/ServerError");
const UserInvalidApiKeyResponse = require("./../responses/UserInvalidApiKey");

module.exports = function (req, res, next) {

    // Check if Authorization header is present
    if (!req.headers.authorization) {
        req.user = null;
        return next()
    }

    // Check bearer token and format
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        // Probably not a valid format
        return UserInvalidApiKeyResponse(res);
    }

    // Check API key
    User.findOne({apiKey: token}, (err, user) => {
        if (err) {
            return ServerErrorResponse(res);
        }

        if (!user) {
            return UserInvalidApiKeyResponse(res)
            // return UserNotFoundResponse(res);
        }

        req.user = user;
        next();
    })


    // Check if data was passed
    // if (!req.body.email || !req.body.password) {
    //     return res.status(400).send({ error: true, message: 'email and password fields are required.' });
    // }

    // User.findOne({ apiKey: req.body.email }, (err, user) => {
    //     if (err) {
    //         return ServerErrorResponse(res);
    //     }
    //     if (!user) {
    //         // return UserNotFoundResponse(res);
    //         return UserInvalidPasswordResponse(res);
    //     }


    //     if (!user.comparePassword(req.body.password)) {
    //         return UserInvalidPasswordResponse(res);
    //     } else {
    //         req.user = user;
    //         return next();
    //     }

    // })

}
