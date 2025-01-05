import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: "https://1drv.ms/i/c/1b2536053cb0aafa/IQRLtj3U1rPaRJr9YMQB-XLtAblcJDGBLTxERkXOlTsT3cE?width=1024",
    },
    phone: {
        type: [Schema.Types.ObjectId],
        default: null,
        ref: 'phone'
    },
    role: {
        type: String,
        enum: {
            values: ['client', 'admin', 'super_admin'],
            message: "Invalid user role."
        } ,
        default: 'client',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashPass: {
        type: String,
        required: true,
    },
    recoveryToken: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        default: false,
    },
    deactivate: {
        type: Boolean,
        default: false,
    },
    purchaseHistory: {
        type: [Schema.Types.ObjectId],
        default: null,
        ref: 'purchase_history'
    },
    adminData: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'admin_data'
    },
    clientData: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'client_data'
    },
    supportPhone: {
        type: [Schema.Types.ObjectId],  // Only accessable for {role => admin}
        default: null,
        ref: 'phone'
    },
}, { timestamps: true });

const user = mongoose.model('users', UserSchema);

export default user;
