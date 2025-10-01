import mongoose from 'mongoose'
import Usuario from './Usuario.js'
import Livro from './Livro.js'

const emprestimoSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: "usuario", required: true},
    livro: {type: mongoose.Schema.Types.ObjectId, ref: "livro", required: true},
    dataEmprestimo: {type: Date, default: Date.now},
    dataDevolucao: {type: Date}
})

export default mongoose.model('Emprestimo', emprestimoSchema)