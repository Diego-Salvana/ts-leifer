import { Router } from 'express';
import { getItems } from '../controllers/order.controller';
import { checkJwt } from '../middlewares/session.middleware';

const router = Router();

//*Ruta creada sólo para comprobar la protección de rutas
router.get('/', checkJwt, getItems);

export { router };
