const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// let activeTokens = [];

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      list: [
        { itemName: "Welcome to TODO" }
      ]
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "oT8sTxJ6C-ZwrHqj4yeJ6a1_ej-Np_4YbCSlCjWxgDs", {
      expiresIn: "1h",
    });
    // activeTokens.push(token);
    res.status(200).json({ token,username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.logout = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     activeTokens = activeTokens.filter((t) => t !== token);
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // if (activeTokens.includes(token)) {
    jwt.verify(token, process.env.JWT_SECRET || "oT8sTxJ6C-ZwrHqj4yeJ6a1_ej-Np_4YbCSlCjWxgDs", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = decoded.userId;
      return res.status(200).json({ message: "Token accepted" });
    });
    // } else {
    // return res.status(401).json({ message: "Token expired or blacklisted" });
    // }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
