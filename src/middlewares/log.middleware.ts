import { NextFunction, Request, Response } from 'express';

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const userAgent = req.headers['user-agent'];
   console.log('user-agent: ', userAgent);
   
   next();
};

export { logMiddleware };
