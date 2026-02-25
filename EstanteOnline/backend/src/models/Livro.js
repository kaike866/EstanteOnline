const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  arquivo: String,
  capa: String
})

module.exports = mongoose.model('Livro', LivroSchema)
