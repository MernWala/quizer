import mongoose, { Schema } from 'mongoose'

const CoupounScheam = new Schema({
    code: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    validsOn: {
        type: [Schema.Types.ObjectId],
        ref: 'plan'
    },
    expiresOn: {
        type: Date,
        default: null,  // null means => unlimited time
        validate: [expireDate => !expireDate || expireDate > Date.now(), 'Expire date must be in the future']
    },
    coupounsCount: {
        type: Number,
        default: null,  // Null means ==> We've unlimited coupoun
    }
}, { timestamps: true })

const coupoun = mongoose.model('coupoun', CoupounScheam)

export default coupoun