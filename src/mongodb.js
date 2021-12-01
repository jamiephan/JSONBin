// Mongoose connect to mongo
const mongoose = require("mongoose");

module.exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 2000 }, (err) => {
        if (err) {
            console.log(err);
            process.exit(1)
        } else {
            console.log("Connected to MongoDB");
        }
    });
}
