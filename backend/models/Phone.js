import mongoose, { Schema } from 'mongoose'

const PhoneSchema = new Schema({
    countryCode: {
        type: String,
        required: [true, 'Country code is required'],
        match: [/^\+\d{1,4}$/, 'Invalid country code format'], // E.g., +1, +91, +44
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{7,15}$/, 'Invalid phone number format'], // E.g., 7-15 digits
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const phone = mongoose.model('phone', PhoneSchema)

export default phone
