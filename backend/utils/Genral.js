import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../config.js'
import UserSchema from '../models/User.js'

export const cookieOptions = {
    httpOnly: true,  // Prevent access to cookie via client-side scripts
    secure: true,   // JSON("true") -> true || JSON("false") -> false
    path: '/',      // Cookie will be available for the entire domain
    sameSite: 'none',  // Required for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24, // Cookie expires after 1 day (value in milliseconds) || {1 second: 1000 millisecond}
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // Alternatively, set an explicit expiration date/time
};

export const hashString = async (str) => {
    return await bcrypt.hash(str, 10);
};

export const RegisterUser = async ({ name, role, email, pass }) => {
    const hashPass = await hashString(pass);
    const user = new UserSchema({ name, role, email, hashPass });
    await user.save()
    return user
};

export const generateToken = (data, options) => {
    return jwt.sign(data, JWT_SECRET, options)
};

export const jwtToPayload = (token) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return {
            valid: true,
            decoded: payload,
            error: null,
            expired: false
        };
    } catch (err) {
        return {
            valid: false,
            decoded: null,
            error: err.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token',
            expired: err.name === 'TokenExpiredError'
        };
    }
};

export const comparePassword = async (password, hashPass) => {
    return await bcrypt.compare(password, hashPass);
};

export const compareString = (str1, str2) => {
    if (str1.length !== str2.length) {
        return false
    }

    const arr1 = str1.split("")
    const arr2 = str2.split("")

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
    }

    return true
};
