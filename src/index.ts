import 'dotenv/config'
import {startServer} from "./server";
import {initMongoDBConnection} from "./db/initMongoDBConnection";
import {createDirIfNotExists} from "./utils/createDirIfNotExists";
import {PUBLIC_DIR, TEMP_DIR} from "./constants/constants";

const bootstrap = async() => {
    await initMongoDBConnection()
    startServer()
    createDirIfNotExists(TEMP_DIR)
    createDirIfNotExists(PUBLIC_DIR)
}

bootstrap()