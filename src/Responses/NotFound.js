
module.exports = res => res.status(404).json({
    error: true,
    message: 'Not Found'
})