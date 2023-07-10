const express = require("express");
const mongoose = require("mongoose");

// database
mongoose.connect("mongodb://127.0.0.1:27017/test");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connection Successful!");
});

const CarSchema = mongoose.Schema({
  name: String,
  price: Number,
  id: String,
  year: {
    type: Number,
    default: 2023,
  },
  added: Date,
  modified: Date,
});
const Car = mongoose.model("Car", CarSchema, "carStock");

// api
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.send(
    `<a href='http://localhost:${port}/html/index.html'>New Car Project!</a>`
  );
});

app.get("/api/carData", async (req, res) => {
  const carData = await Car.find({}).select(
    "name price year added modified -_id"
  );
  res.send(JSON.stringify(carData));
});

app.post("/api/carData/carName", async (req, res) => {
  const userData = req.body;
  console.log(userData.name);
  const sameName = await Car.findOne({ name: userData.name });
  if (!sameName) {
    res.send(JSON.stringify({ status: false }));
    return;
  }
  res.send(JSON.stringify({ status: true }));
});

app.post("/api/carData", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  res.send(JSON.stringify({ message: `got ${req.body}` }));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
