import mongoose from "mongoose";

const ConnectDB = async () => { 
    try {
        const DATABASE_URI = process.env.DATABASE_URI;
        if (!DATABASE_URI) {
            throw new Error('A variável DATABASE_URI não foi definida no arquivo .env');
        }

        await mongoose.connect(DATABASE_URI)
        // ,{
        //     user: process.env.DB_USER,
        //     pass: process.env.DB_PASS,
        //     authSource: 'admin'
        // });
        console.log('MongoDB conectado com sucesso!');
        console.log(`Banco: ${DATABASE_URI}`);
    } catch (error) {
        console.error(' Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export {ConnectDB}