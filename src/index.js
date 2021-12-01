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

// Get Bin Data
app.use("/", require("./routes/data"))

// Default Response
app.use(require("./middleware/defaultResponse"))

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})