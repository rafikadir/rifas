import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Usamos `let` para cachear la conexión
let cachedConnection: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
  // Si ya hay una conexión activa, la retornamos
  if (cachedConnection) {
    // console.log("🆗 Existing MongoDB connection reused");
    return cachedConnection;
  }

  if (!cachedPromise) {
    const options = {
      bufferCommands: false, // Opciones adicionales si es necesario
    };

    cachedPromise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => {
      // console.debug(`🆗 MongoDB connected to ${MONGODB_URI}`);
      return mongooseInstance;
    }).catch(() => {
      // console.error("❌ Error connecting to MongoDB:", error);
      throw new Error("Couldn't connect to MongoDB");
    });
  }

  try {
    cachedConnection = await cachedPromise;
  } catch (error) {
    cachedPromise = null;
    throw error; // Se vuelve a lanzar el error después de resetear `cachedPromise`
  }

  return cachedConnection;
}

export default dbConnect;
