const express = require('express');
const cors = require('cors');
const { connectMongo } = require('./config/db');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

connectMongo();

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
  res.send('API de Microservicios (SQLite + MongoDB) activa');
});

app.listen(port, () => console.log(`🚀 Servidor corriendo en http://localhost:${port}`));