const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: String,
    mensagem: String,
    data: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', schema);

module.exports = ChatMessage;
