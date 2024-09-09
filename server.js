const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB Atlas usando variável de ambiente
const mongoURI = process.env.MONGO_URI; // Pegando a URI do MongoDB do .env
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definição do Schema e Modelo para Ações de Usuário
const userActionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const UserAction = mongoose.model('UserAction', userActionSchema);

// Endpoint para registrar uma ação de usuário
app.post('/register-action', async (req, res) => {
    const { userId, action } = req.body;

    if (!userId || !action) {
        return res.status(400).json({ error: 'userId e action são obrigatórios.' });
    }

    try {
        const newAction = new UserAction({ userId, action });
        await newAction.save();
        res.status(201).json({ message: 'Ação registrada com sucesso!' });
    } catch (err) {
        console.error('Erro ao registrar a ação:', err);
        res.status(500).json({ error: 'Erro ao registrar a ação.' });
    }
});

// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
