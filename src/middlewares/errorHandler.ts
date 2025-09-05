import {NextFunction, Request, Response} from "express";
import {HttpError} from "http-errors";
import {CustomError} from "../types/types";

const errorHandler = (e:CustomError, req:Request, res:Response, next:NextFunction) => {

   if(e instanceof HttpError){
       res.status(e.status).json({
           status: e.status,
           message: e.message,
           ...(e.errors && {errors: e.errors})
       })

       return
   }
    const {status = 500, message = 'Server Error'} = e
    res.status(status).json({
        status,
        message
    })
};

export default errorHandler;