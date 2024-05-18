import dotenv from 'dotenv'
import { connectDB } from './db/db.js';
import { app } from './app.js'

dotenv.config();


connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`)
    })
})
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED", err);
    })