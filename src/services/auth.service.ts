import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

const registerNewUser = async ({ email, password, name }: User) => {
   //Chequear si existe el usuario
   const checkIs = await UserModel.findOne({ email });
   if (checkIs) return 'ALREADY_USER';

   //En caso de que no exista hay que registrarlo
   //Hashear contraseña
   const passHash = await encrypt(password);

   //Guardar usuario en DB
   const registerUser = await UserModel.create({ email, password: passHash, name });
   return registerUser;
};

const loginUser = async ({ email, password }: Auth) => {
   //Chequear si existe el usuario
   const checkIs = await UserModel.findOne({ email });
   if (!checkIs) return 'NOT_FOUND_USER';

   //En caso de que exista el usuario comparar contraseñas
   const passwordHash = checkIs.password; //*contraseña de usuario en la DB
   const isCorrect = await verified(password, passwordHash);

   //Si es incorrecto el password retorna error
   if (!isCorrect) return 'PASSWORD_INCORRECT';

   //Generar token
   const token = generateToken(checkIs.email);

   const data = { token, user: checkIs };

   return data;
};

export { registerNewUser, loginUser };
