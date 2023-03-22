import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'token.01010101';

//Generar token pasando como argumento el payload. Ej.: el id o email
const generateToken = (email: string) => {
   const jwt = sign({ email }, JWT_SECRET, { expiresIn: '2h' });
   return jwt;
};

const verifyToken = (token: string) => {
   const isUser = verify(token, JWT_SECRET);
   return isUser;
};

export { generateToken, verifyToken };
