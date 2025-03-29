import { Request, Response, NextFunction } from "express";


const errorHandler = (err : Error,req : Request,res : Response,next : NextFunction) => {
    switch (true) {
        case typeof err === 'string':
            const is404 = (err as unknown as string).toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({message : err});
        default : 
            return res.status(500).json({message : err.message});
    }
}

export default errorHandler