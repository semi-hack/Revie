import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from "http"
import ConnectDB from './config/db.js';
import router from "./routes/Index.js";

dotenv.config();
ConnectDB();

const PORT = process.env.PORT || 6660

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(router);


const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})

export default server

