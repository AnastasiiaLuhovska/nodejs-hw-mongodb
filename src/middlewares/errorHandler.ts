import {NextFunction, Request, Response} from "express";
import {HttpError} from "http-errors";

const errorHandler = (e:Error, req:Request, res:Response, next:NextFunction) => {

   if(e instanceof HttpError){
       res.status(e.status).json({
           status: e.status,
           message: e.name,
           ...(e.errors && {errors: e.errors})
       })

       return
   }
    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: e.message
    })
};

export default errorHandler;