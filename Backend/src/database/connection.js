import mongoose from "mongoose";

async function connectToDb() {
    try {
        const connectionInstance = await  mongoose.connect(process.env.MONGODB_URL)
        console.log(`connect to DB ${connectionInstance}`);
        
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export default connectToDb;