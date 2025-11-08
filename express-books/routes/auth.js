const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

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
    res.status(500).json({ message: "Erreur du serveur" });
  }
}
);

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
    res.status(200).json({ message: "Connexion réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
}
);
module.exports = router;