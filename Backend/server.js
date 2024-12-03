import app from './app.js';
import { config } from 'dotenv';

config()

const environment = process.env.APP_PORT || 3000;


app.listen(environment, () => {
    console.log(`App is running at ${environment} port`);
    
})