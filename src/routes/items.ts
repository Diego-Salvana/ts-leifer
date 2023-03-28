import { Router } from 'express';
import { deleteItem, getItem, getItems, postItem, updateItems } from '../controllers/items.controller';
import { logMiddleware } from '../middlewares/log.middleware';
import { checkJwt } from '../middlewares/session.middleware';
import { carValidator } from '../middlewares/validationItems.middleware';

const router = Router();

router.get('/', getItems);
router.get('/:id', logMiddleware, checkJwt, getItem);
router.post('/', checkJwt, carValidator, postItem);
router.put('/:id', checkJwt, carValidator, updateItems);
router.delete('/:id', checkJwt, deleteItem);

export { router };
