const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, todoController.createTodo);
router.get("/", authenticate, todoController.getAllTodos);
router.put("/:id", authenticate, todoController.updateTodo);
router.delete("/:id", authenticate, todoController.deleteTodo);

module.exports = router;
