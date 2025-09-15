import express from 'express'
import cors from 'cors'

import {getEnvVar} from "./utils/getEnvVar";
import router from "./routes/contacts";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
import authRouter from "./routes/auth";
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs';

export const startServer = () =>{
    const app = express()

    app.use(cors());

    app.use(express.json())

    app.use(cookieParser());

    app.use(express.static('public'))

    app.get('/', (req, res) => {
        res.send('Backend is running 🚀');
    });

    app.use('/api-docs', ...swaggerDocs())

    app.use(authRouter)

    app.use(router)

    app.use(notFoundHandler)

    app.use(errorHandler)

    const port = Number(getEnvVar("PORT", 3000))

    app.listen(port, ()=> {console.log('server is working')})
    }
