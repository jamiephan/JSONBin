require("dotenv").config();
require("./mongodb").connect();
const express = require("express")
const app = express()

// Middlewares
app.use(require("./middleware/forceJSONContentType"));
app.use(express.json({ limit: "1mb" }))
app.use(require("./middleware/checkJSONValidity"));

// Pretty print response JSON
app.set("json spaces", 2)

// API Route
app.use("/api/user", require("./routes/api/user"))
app.use("/api/bin", require("./routes/api/bin"))
app.use("/api/debug", require("./routes/api/debug"))


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


// Default Response
app.use(require("./middleware/defaultResponse"))

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})