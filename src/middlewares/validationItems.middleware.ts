import { body } from 'express-validator';
import { validatorResultExpress } from './validResult.middleware';

const carValidator = [
   body('name', 'El nombre es obligatorio').trim().notEmpty(),
   body('color', 'El color es obligatorio').trim().notEmpty(),
   body('gas', 'El combustible debe ser gasoline o electric').trim().matches(/^gasoline$|^electric$/i),
   body('year', 'Formato de año incorrecto').trim().isLength({ min: 4, max: 4 }),
   body('description', 'La descripción es obligatoria').trim().notEmpty(),
   body('price', 'El precio es obligatorio').trim().notEmpty(),
   validatorResultExpress,
];

export { carValidator };
