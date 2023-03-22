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

      if (!isUser) {
         res.status(401).send('NO_TIENES_UN_JWT_VÁLIDO');
      } else {
         //Agrego el cuerpo del payload decodificado a la Request para tener info del usuario
         req.user = isUser;

         next();
      }
   } catch (err: any) {
      console.log(err);
      res.status(400);
      res.send('SESIÓN_NO_VÁLIDA');
   }
};

export { checkJwt };
