import { Response } from 'express';
import { RequestExt } from '../interfaces/requestExt.interface';
import { handleHttp } from '../utils/error.handle';

const getItems = async (req: RequestExt, res: Response) => {
   try {
      console.log(req.user);
      res.send({ data: 'Esto lo ven sólo perosnas con JWT válido' });
   } catch (err) {
      handleHttp(res, 'ERROR_GET_ITEMS');
   }
};

export { getItems };
