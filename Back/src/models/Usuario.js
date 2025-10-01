import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})

export default mongoose.model('Usuario', usuarioSchema)