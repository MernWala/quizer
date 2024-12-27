import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

export const PRODUCTION = process.env.PRODUCTION || "false"
export const MAILINGADDRESS = process.env.MAILINGADDRESS || "dummymail@domain.com"
export const MAILINGKEY = process.env.MAILINGKEY || "some password here"
export const JWT_SECRET = process.env.JWT_SECRET || "vi\D@`B_N({x*zoE]EI!Xe.U3H+7}_3vzW8GVQT42\&FN@g8{C"
export const FRONTENDHOST = process.env.FRONTENDHOST || "http://localhost:3000"
export const URI = process.env.URI || "mongodb://localhost:27017/quizer"
