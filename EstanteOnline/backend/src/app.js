import express from 'express'
import cors from 'cors'
import livrosRoutes from './routes/livrosRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/livros', livrosRoutes)

export default app
