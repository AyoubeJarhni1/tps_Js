const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./coonctionDb/mongosse');
const auth = require('./routes/auth');

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());


app.use("/auth", auth);
console.log(auth);


app.get('/', (req, res) => {
  res.send('Serveur Express connecté à MongoDB ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
