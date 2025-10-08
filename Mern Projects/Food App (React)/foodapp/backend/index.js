const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Connect to MongoDB
mongoDB();

// Middleware to handle CORS manually (you can use cors package instead)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api', require("./routes/Create_User"));
app.use('/api', require("./routes/Display_Data"));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
