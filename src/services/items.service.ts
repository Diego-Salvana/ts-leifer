import { Car } from '../interfaces/car.interface';
import ItemModel from '../models/item.model';

const insertCar = async (item: Car) => {
   const responseInsert = await ItemModel.create(item);
   return responseInsert;
};

const getCars = async () => {
   const responseItems = await ItemModel.find();
   return responseItems;
};

const getCar = async (id: string) => {
   const responseItem = await ItemModel.findOne({ _id: id });
   return responseItem;
};

const updateCar = async (id: string, data: Car) => {
   const responseItem = await ItemModel.findOneAndUpdate({ _id: id }, data, { new: true });
   return responseItem;
};

const deleteCar = async (id: string) => {
   const responseItem = await ItemModel.deleteOne({ _id: id });
   return responseItem;
};

export { insertCar, getCars, getCar, updateCar, deleteCar };
