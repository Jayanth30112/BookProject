const express = require("express");
const { json, urlencoded } = require("express");
const { json: _json } = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const booksRoutes = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(_json());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// mongoDB connection
connectDB();

// Routes
app.use("/books", booksRoutes);

// Spin up server on port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
