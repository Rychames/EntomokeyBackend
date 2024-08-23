const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

// Importar rotas
const insectRoutes = require('./routes/insects');
const authRoutes = require('./routes/auth'); // Certifique-se de que esta rota está sendo importada

// Usar rotas
app.use('/insects', insectRoutes);
app.use('/api/auth', authRoutes); // Certifique-se de que a rota está correta

module.exports = app;
