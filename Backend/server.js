import app from './src/app.js';
import { config } from 'dotenv';
import connectToDb from './src/database/connection.js';

config()

const environment = process.env.APP_PORT || 3000;


connectToDb()
app.listen(environment, () => {
    console.log(`App is running at ${environment} port`);
    
})