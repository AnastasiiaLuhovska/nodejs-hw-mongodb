import express from 'express'
import cors from 'cors'

import {getEnvVar} from "./utils/getEnvVar";
import router from "./routes/contacts";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
import authRouter from "./routes/auth";
import cookieParser from 'cookie-parser';

export const startServer = () =>{
    const app = express()

    app.use(cors());

    app.use(express.json())

    app.use(cookieParser());

    app.get('/', (req, res) => {
        res.send('Backend is running 🚀');
    });

    app.use(authRouter)

    app.use(router)

    app.use(notFoundHandler)

    app.use(errorHandler)

    const port = Number(getEnvVar("PORT", 3000))

    app.listen(port, ()=> {console.log('server is working')})
    }
