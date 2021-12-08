
module.exports = res => res.status(400).json({
    error: true,
    message: 'User already exist'
})