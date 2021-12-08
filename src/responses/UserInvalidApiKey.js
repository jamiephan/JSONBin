module.exports = res => res.status(401).json({
    error: true,
    message: 'Invalid API Key'
})