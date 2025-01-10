import { jwtToPayload } from "../utils/Genral.js";
import UserSchema from "../models/User.js"

const getAllQuizez = async (token) => {
    try {

        const { decoded } = jwtToPayload(token);
        const user = await UserSchema.findOne({ _id: decoded?._id }).populate({
            path: "adminData",
            select: "quizes",
        }).exec();

        if (!user)
            return null;
        return user?.adminData?.quizes

    } catch (error) {
        console.log("GETTING_ALL_QUIZES_ERROR - getAllQuizes.js:18");
        return null
    }
}

export default getAllQuizez;