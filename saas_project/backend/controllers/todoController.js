const User = require("../models/User");

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.list.push({ itemName: title });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await User.findById(req.userId);
    res.json(todos.list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId, "list._id": id },
      { $set: { "list.$.itemName": title } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { $pull: { list: { _id: id } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
