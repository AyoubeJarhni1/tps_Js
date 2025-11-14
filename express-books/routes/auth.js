import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe invalide" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe invalide" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});

export default router;
