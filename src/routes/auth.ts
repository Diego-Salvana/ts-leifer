import { Router } from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth.controller';
import { loginValidator, registerValidator } from '../middlewares/validationAuth.middleware';

const router = Router();

router.post('/register', registerValidator, registerCtrl);
router.post('/login', loginValidator, loginCtrl);

export { router };
