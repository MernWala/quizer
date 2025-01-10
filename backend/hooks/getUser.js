import { jwtToPayload } from "../utils/Genral.js";
import UserSchema from "../models/User.js";

const getUser = async (token) => {
    try {
        const { valid, decoded, error, expired } = jwtToPayload(token);

        if (!valid || error) {
            return { error: true, mess: "Invalid token!" };
        }

        if (expired) {
            return { error: true, mess: "Token expired!" };
        }

        if (decoded?._id) {
            const user = await UserSchema.findById(decoded._id).populate('adminData');
            if (!user) 
                return { error: true, mess: "User not found!" };
            return { user };
        }

        return { error: true, mess: "Invalid payload!" };
        
    } catch (error) {
        return { error: true, mess: error.message };
    }
};

export default getUser;
