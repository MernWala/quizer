import mongoose from 'mongoose';
import {URI} from "../config.js"

const ConnectToDB = async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(URI);
            console.log('DB_CONNECTED')
            next()
        } catch (error) {
            console.log('DB_CONNECTION_ERROR')
            return res.status(500).json({
                error,
                message: 'Database connection failed'
            })
        }
    } else {
        next()
    }
};

export default ConnectToDB
