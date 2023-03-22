import { Router } from 'express';
import { deleteItem, getItem, getItems, postItem, updateItems } from '../controllers/items.controller';
import { logMiddleware } from '../middlewares/log.middleware';

const router = Router();

router.get('/', getItems);
router.get('/:id', logMiddleware, getItem);
router.post('/', postItem);
router.put('/:id', updateItems);
router.delete('/:id', deleteItem);

export { router };
