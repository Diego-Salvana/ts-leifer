import { Request, Response } from 'express';
import { insertCar, getCars, getCar, updateCar, deleteCar } from '../services/items.service';
import { handleHttp } from '../utils/error.handle';

const getItem = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const responseItem = await getCar(id);
      const data = responseItem
         ? { ok: true, car: responseItem }
         : { ok: false, message: 'AUTO_NO_ENCONTRADO' };

      res.send(data);
   } catch (err) {
      handleHttp(res, 'ERROR_GET_ITEM', err);
   }
};

const getItems = async (req: Request, res: Response) => {
   try {
      const responseItems = await getCars();
      res.send(responseItems);
   } catch (err) {
      handleHttp(res, 'ERROR_GET_ITEMS', err);
   }
};

const updateItems = async ({ params, body }: Request, res: Response) => {
   try {
      const responseItem = await updateCar(params.id, body);
      res.send({ ok: true, updateCar: responseItem });
   } catch (err) {
      handleHttp(res, 'ERROR_UPDATE_ITEM', err);
   }
};

const postItem = async ({ body }: Request, res: Response) => {
   try {
      const responseItem = await insertCar(body);
      res.status(201).send({ ok: true, newCar: responseItem });
   } catch (err) {
      handleHttp(res, 'ERROR_POST_ITEM', err);
   }
};

const deleteItem = async ({ params }: Request, res: Response) => {
   try {
      const responseItem = await deleteCar(params.id);

      if (responseItem.deletedCount < 1) {
         res.status(400).send({ ok: false, message: 'ITEM_NO_ENCONTRADO', deleteResult: responseItem });
      } else {
         res.send({ ok: true, deleteResult: responseItem });
      }
   } catch (err) {
      handleHttp(res, 'ERROR_DELETE_ITEM', err);
   }
};

export { getItem, getItems, updateItems, postItem, deleteItem };
