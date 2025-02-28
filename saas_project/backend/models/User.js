const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  itemName: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  list: [listItemSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
