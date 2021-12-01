
module.exports = res => res.status(500).json({
    error: true,
    message: 'Server Error'
})