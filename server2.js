const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configuração do bodyParser para parsear o body das requisições
app.use(bodyParser.json());

// Substitua com a URI de conexão do MongoDB que você já tem
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Conectando ao MongoDB existente
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas', err));

// Definindo o Schema e o Model para o histórico de ações do usuário
const userActionSchema = new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

const UserAction = mongoose.model('UserAction', userActionSchema);

// Endpoint para registrar uma nova ação do usuário
app.post('/api/user-action', async (req, res) => {
  const { userId, action } = req.body;

  try {
    const newUserAction = new UserAction({ userId, action });
    await newUserAction.save();
    res.status(201).send('Ação registrada com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao registrar ação.');
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
