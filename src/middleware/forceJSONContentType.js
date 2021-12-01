module.exports = function(req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
}