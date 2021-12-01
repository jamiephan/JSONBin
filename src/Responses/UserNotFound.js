
module.exports = res => res.status(404).json({
    error: true,
    message: 'User Not Found'
})