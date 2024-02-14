const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const PORT = process.env.PORT;
const connectDb = require("./db/connect");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.static("build"));

if (process.env.SERVER === "production") {
  // executes in production mode
  app.use(`/`, (req, res, next) => {
    return res.sendFile(path.resolve(__dirname, `./build/index.html`));
    next();
  });
}

app.use(cors());
app.use(cookieParser(process.env.ACCESS_SECRET));
//api route
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/doctor", require("./routes/doctorRoute"));

//default path

app.use("**", (req, res) => {
  res
    .status(StatusCodes.SERVICE_UNAVAILABLE)
    .json({ msg: `Requested service path not found`, success: false });
});

//server listen
app.listen(PORT, () => {
  connectDb(); //connected mongo
  console.log(`server is started and running at @http://localhost:${PORT}`);
});
