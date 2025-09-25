import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";

const router = express.Router();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

// sign up
router.post("/signup", bruteforce.prevent, async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    let newDocument = {
      name: req.body.user,
      password: password.toString()
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// login
router.post("/login", bruteforce.prevent, async (req, res) => {
  const { user, password } = req.body;
  try {
    const collection = await db.collection("users");
    const foundUser = await collection.findOne({ name: user });
    if (!foundUser) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { username: user },
      "this_secret_should_be_longer_than_it_is",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Authentication successful", token, name: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});