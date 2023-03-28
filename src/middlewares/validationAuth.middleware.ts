import { body } from 'express-validator';
import { validatorResultExpress } from './validResult.middleware';

const registerValidator = [
   body('name', 'Nombre es obligatorio').trim().isLength({ min: 1 }),
   body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
   body('password', 'Formato de contraseña incorrecto').trim().isLength({ min: 1 }),
   validatorResultExpress,
];

const loginValidator = [
   body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
   body('password', 'Formato de contraseña incorrecto').trim().isLength({ min: 1 }),
   validatorResultExpress,
];

export { registerValidator, loginValidator };
