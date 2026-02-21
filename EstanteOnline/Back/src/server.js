import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './database.js'


// Routes
import UsuarioRoutes from './routes/usuarioRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

// Coneccao rotas
app.use('/usuarios', UsuarioRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})