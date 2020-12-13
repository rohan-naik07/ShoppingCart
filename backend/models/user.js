const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const Users = mongoose.model("Users", userSchema);

module.exports = {
  User: Users,
};