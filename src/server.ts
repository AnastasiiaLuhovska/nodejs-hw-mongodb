import express,  { Request, Response }  from 'express'
import cors from 'cors'
import {CustomError} from "./types/types";
import ContactCollection from "./db/models/model";
import {getContacts, getContactsById} from "./services/contacts";

export const startServer = () =>{
    const app = express()

    app.use(cors());

    app.use(express.json())

    app.get('/contacts', async (req:Request, res:Response)=> {
        try {
            const data = await getContacts()
            res.json({
                status: 200,
                message: 'Successfully found contacts!',
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed to fetch contacts',
                error: error.message
            });

        }
    })

    app.get('/contacts/:contactId', async (req:Request, res:Response)=> {
        try {
            const {contactId} = req.params

            const data = await getContactsById(contactId)
            if(!data) {
                 res.status(404).json({
                    message: `Contact with id ${contactId} is not found`,
                })
                return
            }
            res.json({
                status: 200,
                message: 'Successfully found contacts!',
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed to fetch contacts',
                error: error.message
            });

        }
    })

    app.use((req:Request, res:Response)=>{
        res.status(404).json({
            message: `${req.url} is not found`
        })
    })

    app.use((error:CustomError, req:Request, res:Response)=>{
        const {status, message} = error
        res.status(status).json({
            status,
            message
        })
    })


    app.listen(3000, ()=> {console.log('server is working')})
    }
