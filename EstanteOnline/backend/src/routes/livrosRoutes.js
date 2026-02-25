const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  resumo: { type: String, required: true },
  arquivo: { type: String, required: true },
  capa: { type: String, required: true }
}, { collection: 'livros', timestamps: true })

const Livro = mongoose.models.Livro || mongoose.model('Livro', LivroSchema)


// 🔹 Download PDF (antes de /:id!)
router.get('/download/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id)

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' })
    }

    const filePath = path.resolve(__dirname, '../../uploads', livro.arquivo)

    console.log("Procurando arquivo em:", filePath)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Arquivo não encontrado' })
    }

    res.download(filePath)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao baixar livro' })
  }
})


// 🔹 Seed
router.get('/seed', async (req, res) => {
  try {
    await Livro.deleteMany({})

    const livros = await Livro.insertMany([
      {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        resumo: "Romance psicológico narrado por Bentinho.",
        arquivo: "dom-casmurro.pdf",
        capa: "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg"
      },
      {
        titulo: "O Cortiço",
        autor: "Aluísio Azevedo",
        resumo: "Retrato naturalista da vida em um cortiço.",
        arquivo: "o-cortico.pdf",
        capa: "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg"
      },
      {
        titulo: "Memórias Póstumas de Brás Cubas",
        autor: "Machado de Assis",
        resumo: "Narrado por um defunto autor.",
        arquivo: "memoriasBras.pdf",
        capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
      },
      {
        titulo: "A Moreninha",
        autor: "Joaquim Manuel de Macedo",
        resumo: "Clássico romântico brasileiro.",
        arquivo: "a_moreninha.pdf",
        capa: "https://covers.openlibrary.org/b/id/11153243-L.jpg"
      },
      {
        titulo: "Os Lusíadas",
        autor: "Luís de Camões",
        resumo: "Poema épico português.",
        arquivo: "OsLusiadas-Luis_de_Camoes.pdf",
        capa: "https://covers.openlibrary.org/b/id/8231990-L.jpg"
      },
      {
        titulo: "O Alienista",
        autor: "Machado de Assis",
        resumo: "Novela satírica sobre loucura.",
        arquivo: "O-Alienista.pdf",
        capa: "https://covers.openlibrary.org/b/id/8235081-L.jpg"
      },
      {
        titulo: "Iracema",
        autor: "José de Alencar",
        resumo: "Romance indianista brasileiro.",
        arquivo: "Iracema-Jose_de_Alencar.pdf",
        capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWkYmFZDEdT1YnAlkO3YIvu6sGcgLTVcpJA&s"
      }
    ])

    res.json(livros)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar seed' })
  }
})


// 🔹 Listar todos
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find().sort({ createdAt: -1 })
    res.json(livros)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar livros' })
  }
})


// 🔹 Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id)
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' })
    res.json(livro)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar livro' })
  }
})

module.exports = router
