module.exports = function (err, req, res, next) {
    if (err instanceof SyntaxError) {
        res.status(400).send({ error: 400, message: "Invalid JSON" })
    } else {
        next()
    }
}