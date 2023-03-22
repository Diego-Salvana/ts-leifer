import { Auth } from './auth.interface';

//Interface con toda la información de Usuario

export interface User extends Auth {
   id: string;
   name: string;
   description: string;
}
