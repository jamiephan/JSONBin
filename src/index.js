require("dotenv").config();
require("./mongodb").connect();
const express = require("express")
const app = express()


// Disable x-powered-by header
app.disable("x-powered-by")
// Pretty print response JSON
app.set("json spaces", 2)
// HTML UI pug
app.set("views", __dirname + "/views/")
app.set("view engine", "pug")

// Middlewares
app.use(express.json({ limit: "1mb", type: () => true}))
app.use(require("./middleware/checkJSONValidity"));

// API Route
app.use("/api/user", require("./routes/api/user"))
app.use("/api/bin", require("./routes/api/bin"))

if(process.env.NODE_ENV !== "production") {
    app.use("/api/debug", require("./routes/api/debug"))
}

// Get Bin Data
app.use("/", require("./routes/data"))

// Default Response
// app.use(require("./middleware/defaultResponse"))
app.get("/", (req, res) => {
    res.render("jsonViewer")
})
// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})