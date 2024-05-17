import mongoose from "mongoose";
import { DBNAME } from "../constants.js";


async function connectDB() {
    try {
        console.log('DB CONNECTED');
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
        console.log(`HOST : ${connectionInstance.connection.host}`);
    }
    catch (err) {
        console.log("MONGODB connection FAILED ", err);
        process.exit(1)
    }
}

export { connectDB };