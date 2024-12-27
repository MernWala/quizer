import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'admin', 'super_admin'],
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
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const user = mongoose.model('User', UserSchema);

UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.hashPass);
};

export default user;
