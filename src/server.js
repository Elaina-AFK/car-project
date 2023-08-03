const express = require("express");
const db = require("./db.js");
const session = require("express-session");
// database

const port = 3000;
const url = `http://localhost:${port}`;

// middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
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
  const carData = await db.Car.find({}).select(
    "name price year added modified -_id"
  );
  res.send(JSON.stringify(carData));
});

app.post("/api/carData/carName", isAuthenticated, async (req, res) => {
  const userData = req.body;
  const sameName = await db.Car.findOne({ name: userData.name });
  if (sameName) {
    res.send(JSON.stringify({ status: true }));
    return;
  } else {
    res.send(JSON.stringify({ status: false }));
  }
});

app.post("/api/carData", isAuthenticated, async (req, res) => {
  const userData = req.body;
  res.send(JSON.stringify({ message: `got ${userData.name}` }));
});

app.get("/login", (req, res) => {
  return res.sendFile(__dirname + "/html/login.html");
});

app.post("/api/login", async (req, res) => {
  const userData = req.body;
  // look up user database if match add session if not reject
  const user = await db.Member.findOne({
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
