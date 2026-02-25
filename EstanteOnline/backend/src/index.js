const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const livroRoutes = require('./routes/livrosRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Servir arquivos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rotas
app.use('/livros', livroRoutes)

app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})

const MONGO_URL = 'mongodb+srv://kaikesouza1518_db_user:admin@bankprojects.xbcsnfv.mongodb.net/EstanteOnline'

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB conectado')
    app.listen(4000, () => console.log('🚀 Servidor rodando na porta 4000'))
  })
  .catch(err => console.error(err))
