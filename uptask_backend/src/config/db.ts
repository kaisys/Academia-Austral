import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process';

export const connectDB = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(url)
        console.log(colors.cyan.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        console.log('Error al conectar mongo db ups')
        //es importante el exit 1 para comprobar que no se conecto
        exit(1)
    }
}