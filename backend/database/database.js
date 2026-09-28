import mongoose from "mongoose";

const ConnectDB = async () => { 
    const uri = process.env.DATABASE_URI;
    
      if (!uri) {
        console.error("DATABASE_URI não definida no .env");
        process.exit(1);
      }
    
      mongoose.connection.on("disconnected", () =>
        console.warn("MongoDB desconectado")
      );
      mongoose.connection.on("error", (err) =>
        console.error("Erro na conexão com o MongoDB:", err.message)
      );
    
      try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("MongoDB conectado!");
      } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error.message);
        process.exit(1);
      }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export {ConnectDB}