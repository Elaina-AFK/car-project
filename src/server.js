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

const isAuthorized = (req, res, next) => {
  if (req.session.user.role === "admin") {
    next();
    return;
  }
  return res.status(401).send("Unauthorized");
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
    "id name price year added modified -_id"
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
  const addedDate = new Date();
  const id = Number(new Date()).toString(32);
  console.log(userData);
  const newCar = new db.Car({
    ...userData,
    added: addedDate,
    modified: addedDate,
    id: id,
  });
  await newCar.save();
  res.send(
    JSON.stringify({
      pass: true,
      data: { id: id, added: addedDate, modified: addedDate },
    })
  );
});

app.put("/api/carData", isAuthenticated, async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await db.Car.findOneAndUpdate({ id: id }, { ...updateData });
    res.send({ pass: true });
  } catch (e) {
    res.send({ pass: false });
  }
});

app.delete("/api/carData", isAuthenticated, async (req, res) => {
  const id = req.body.id;
  const deleted = await db.Car.findOneAndDelete({ id });
  deleted ? res.send({ isDeleted: true }) : res.send({ idDeleted: false });
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
    req.session.user.role = user.role;
    console.log(user.role);
    res.send(JSON.stringify({ message: "pass", link: `/html/index.html` }));
    return;
  }
  return res.send(JSON.stringify({ message: "failed", link: null }));
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  return res.send(JSON.stringify({ message: "logout!" }));
});

app.get("/admin", isAuthenticated, isAuthorized, (req, res) => {
  return res.sendFile(__dirname + "/html/admin.html");
});

app.get("/api/member", isAuthenticated, isAuthorized, async (req, res) => {
  const user = await db.Member.find().select("id username role -_id");
  return res.send(user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
