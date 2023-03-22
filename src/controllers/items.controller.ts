import { Request, Response } from 'express';
import { insertCar, getCars, getCar, updateCar, deleteCar } from '../services/items.service';
import { handleHttp } from '../utils/error.handle';

const getItem = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const responseItem = await getCar(id);
      const data = responseItem ? responseItem : 'NOT_FOUND';
      res.send(data);
   } catch (err) {
      handleHttp(res, 'ERROR_GET_ITEM');
   }
};

const getItems = async (req: Request, res: Response) => {
   try {
      const responseItems = await getCars();
      res.send(responseItems);
   } catch (err) {
      handleHttp(res, 'ERROR_GET_ITEMS');
   }
};

const updateItems = async ({ params, body }: Request, res: Response) => {
   try {
      const responseItem = await updateCar(params.id, body);
      res.send(responseItem);
   } catch (err) {
      handleHttp(res, 'ERROR_UPDATE_ITEM');
   }
};

const postItem = async ({ body }: Request, res: Response) => {
   try {
      const responseItem = await insertCar(body);
      res.send(responseItem);
   } catch (err) {
      handleHttp(res, 'ERROR_POST_ITEM', err);
   }
};

const deleteItem = async ({ params }: Request, res: Response) => {
   try {
      const responseItem = await deleteCar(params.id);
      res.send(responseItem);
   } catch (err) {
      handleHttp(res, 'ERROR_DELETE_ITEM');
   }
};

export { getItem, getItems, updateItems, postItem, deleteItem };
