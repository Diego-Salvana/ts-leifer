import { NextFunction, Response } from 'express';
import { RequestExt } from '../interfaces/requestExt.interface';
import { verifyToken } from '../utils/jwt.handle';

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
   try {
      //Tomar JWT de los headers
      const jwtByUser = req.headers.authorization || '';
      const jwt = jwtByUser.split(' ').pop();

      //Verificar JWT. En caso de éxito devuelve el payload decodificado
      const isUser = verifyToken(`${jwt}`);

      //Agrego el cuerpo del payload decodificado a la Request para tener info del usuario
      if (typeof isUser !== 'string') {
         req.user = isUser;
      }

      next();
   } catch (err: any) {
      console.log(err);
      res.status(401).send({ ok: false, error: 'SESIÓN_NO_VÁLIDA', message: err.message });
   }
};

export { checkJwt };
