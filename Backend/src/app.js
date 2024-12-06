import express from "express";
import userRoutes from "./routes/user.routes.js";
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello world')
} )
app.use('/api/v1/users', userRoutes)


export default app