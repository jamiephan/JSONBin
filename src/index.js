require("dotenv").config();
const express = require("express")
const app = express()
const port = 8080

// Mongoose connect to mongo
const mongoose = require("mongoose");
const Bin = require("./models/bin");
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });


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

// Data
app.get("/:name", (req, res) => {
    Bin.findOne({ name: req.params.name }, (err, bin) => {
        if (!bin) {
            res.status(404).send({ error: 404, message: "Bin not found" })
        } else {
            res.send(bin.data)
        }
    })
})



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