const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const PORT = process.env.PORT;
const connectDb = require("./db/connect");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "build")));

app.use(cors());
app.use(cookieParser(process.env.ACCESS_SECRET));

// API Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/doctor", require("./routes/doctorRoute"));

// Serve React app for any other route (except API routes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Default path for unknown API routes (404 Not Found)
app.use("/api/*", (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: "Requested service path not found", success: false });
});

// Server listen with database connection
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(`Failed to connect to the database: ${err.message}`);
    process.exit(1); // Exit the process with failure
  });
