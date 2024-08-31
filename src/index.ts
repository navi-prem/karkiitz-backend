import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser"

import { User } from './routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const allowedOrigins = "*";

const corsOptions = {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 202,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use(User.BASE_ROUTE, User.router)

app.get("/hello-world", (_: Request, res: Response) => {
    return res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
