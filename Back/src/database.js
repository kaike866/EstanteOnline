import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'biblioteca',
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('Banco conectado')

        const db = conn.connection.db;
        await Promise.all([
            await db.createCollection('usuario').catch(() => {}),
            await db.createCollection('livro').catch(() => {}),
            await db.createCollection('emprestimo').catch(() => {}),
        ])
        console.log('Base criada')
    }catch(error){
        console.log('Erro ao conectar')
        process.exit(1)
    }
}

export default connectDB;