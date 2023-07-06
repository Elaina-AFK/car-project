const express = require("express");

const app = express();

app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.send(
    `<a href='http://localhost:${port}/html/index.html'>New Car Project!</a>`
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
