import mongoose from "mongoose";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectToDb() {
    try {
        console.log(process.env.MONGODB_URL, clientOptions);
        
        const connectionInstance = await  mongoose.connect(process.env.MONGODB_URL, clientOptions)
        console.log(`connect to DB ${connectionInstance}`);
        
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export default connectToDb;