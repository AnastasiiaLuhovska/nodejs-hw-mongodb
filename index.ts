import 'dotenv/config'
import {startServer} from "./src/server";
import {initMongoDBConnection} from "./src/db/initMongoDBConnection";

const bootstrap = async() => {
    await initMongoDBConnection()
    startServer()
}

bootstrap()