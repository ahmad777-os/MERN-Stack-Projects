const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ahmadtariq7799_db_user:b9IpwA87zAlN34dh@cluster0.di53a0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
