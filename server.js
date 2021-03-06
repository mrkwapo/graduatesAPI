require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/", express.static("public"));
const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const graduatesRouter = require("./routes/graduates");

app.use("/api/graduates", graduatesRouter);

app.listen(3000, () => console.log("Server Running..."));
