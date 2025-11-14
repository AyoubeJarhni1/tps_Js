// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectionDb/mongosse.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Serveur Express connecté à MongoDB');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
