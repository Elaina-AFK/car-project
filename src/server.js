const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
// database
mongoose.connect("mongodb://127.0.0.1:27017/test");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connection Successful!");
});
const port = 3000;
const url = `http://localhost:${port}`;

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

const MemberSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  id: String,
  role: String,
});
const Member = mongoose.model("Member", MemberSchema, "members");
// middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log(req.session);
    next();
    return;
  }
  return res.redirect("/login");
};

// api
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "very secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.get("/", isAuthenticated, (req, res) => {
  res.send(
    `<a href='http://localhost:${port}/html/index.html'>New Car Project!</a>`
  );
});

app.get("/api/carData", isAuthenticated, async (req, res) => {
  const carData = await Car.find({}).select(
    "name price year added modified -_id"
  );
  res.send(JSON.stringify(carData));
});

app.post("/api/carData/carName", isAuthenticated, async (req, res) => {
  const userData = req.body;
  const sameName = await Car.findOne({ name: userData.name });
  if (sameName) {
    res.send(JSON.stringify({ status: true }));
    return;
  } else {
    res.send(JSON.stringify({ status: false }));
  }
});

app.post("/api/carData", isAuthenticated, async (req, res) => {
  const userData = req.body;
  console.log(userData);
  res.send(JSON.stringify({ message: `got ${userData.name}` }));
});

app.get("/login", (req, res) => {
  return res.sendFile(__dirname + "/html/login.html");
});

app.post("/api/login", async (req, res) => {
  const userData = req.body;
  // look up user database if match add session if not reject
  const user = await Member.findOne({
    username: userData.username,
    password: userData.password,
  });
  if (user) {
    req.session.user = {};
    req.session.user.username = user.username;
    console.log({ user });
    res.send(JSON.stringify({ message: "pass", link: `/html/index.html` }));
    return;
  }
  return res.send(JSON.stringify({ message: "failed", link: null }));
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  return res.send(JSON.stringify({ message: "logout!" }));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
