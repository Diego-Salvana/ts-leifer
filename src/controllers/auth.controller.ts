import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth.service';

const registerCtrl = async ({ body }: Request, res: Response) => {
   try {
      const responseUser = await registerNewUser(body);
      res.status(201).send({ ok: true, message: 'Nuevo usuario registrado', newUser: responseUser });
   } catch (err: any) {
      console.log('Controller Auth', err);
      if (err.code === 11000) {
         res.status(400).send({ ok: false, message: 'El usuario ya existe' });
      } else {
         res.status(500).send({ ok: false, message: 'Falló el registro' });
      }
   }
};

const loginCtrl = async ({ body }: Request, res: Response) => {
   try {
      const { email, password } = body;
      const responseUser = await loginUser({ email, password });

      if (responseUser === 'USUARIO_NO_ENCONTRADO' || responseUser === 'CONTRASEÑA_INCORRECTA') {
         res.status(400).send({ ok: false, message: responseUser });
      } else {
         res.send({ ok: true, ...responseUser });
      }
   } catch (err: any) {
      console.log('Controller Auth', err);
      res.status(500).send({ ok: false, error: err.message });
   }
};

export { registerCtrl, loginCtrl };
