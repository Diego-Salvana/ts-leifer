import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

const registerNewUser = async ({ email, password, name }: User) => {
   //Hashear contraseña.
   const passHash = await encrypt(password);

   //Guardar usuario en DB. En caso de que exista el usuario lanzará un error.
   const registerUser = await UserModel.create({ email, password: passHash, name });

   return registerUser;
};

const loginUser = async ({ email, password }: Auth) => {
   //Chequear si existe el usuario
   const checkIs = await UserModel.findOne({ email });
   if (!checkIs) return 'USUARIO_NO_ENCONTRADO';

   //En caso de que exista el usuario comparar contraseñas
   const passwordHash = checkIs.password; //*contraseña de usuario en la DB
   const isCorrect = await verified(password, passwordHash);
   if (!isCorrect) return 'CONTRASEÑA_INCORRECTA';

   //Generar token
   const token = generateToken(checkIs.email);

   const data = { token, user: checkIs };

   return data;
};

export { registerNewUser, loginUser };
