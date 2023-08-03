const mongoose = require("mongoose");

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

const MemberSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  id: String,
  role: String,
});
const Member = mongoose.model("Member", MemberSchema, "members");

module.exports = {
  Car,
  Member,
};
