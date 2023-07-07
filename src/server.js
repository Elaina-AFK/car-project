const express = require("express");

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

const testData = [
  {
    name: "A",
    age: 5,
    type: "hyper!",
  },
  {
    name: "A",
    age: 5,
    type: "hyper!",
  },
  {
    name: "A",
    age: 5,
    type: "hyper!",
  },
  {
    name: "A",
    age: 5,
    type: "hyper!",
  },
  {
    name: "A",
    age: 5,
    type: "hyper!",
  },
];

app.get("/api/carData", (req, res) => {
  res.send(JSON.stringify(testData));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
