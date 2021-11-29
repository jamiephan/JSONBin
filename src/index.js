require("dotenv").config();
const express = require("express")
const app = express()
const port = 8080


// Force Content-Type to be JSON
app.use((req, res, next) => {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
})

app.use(express.json({ limit: "1mb" }))

// Check JSON validity
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).send({ error: 400, message: "Invalid JSON" })
    } else {
        next()
    }
})

app.set("json spaces", 2)


// API Route
app.use("/api", require("./routes/api"))


// Default 404 Route
app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: "Not Found"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})