import 'dotenv/config'
import {startServer} from "./server";
import {initMongoDBConnection} from "./db/initMongoDBConnection";

const bootstrap = async() => {
    await initMongoDBConnection()
    startServer()
}

bootstrap()