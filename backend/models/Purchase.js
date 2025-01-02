import mongoose, { Schema } from 'mongoose'

const PurchaseHistorySchema = new Schema({
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'plan',
        required: true
    },
    transectionId: {
        type: String,
        required: true
    },
    transectionTime: {
        type: Date,
        required: true
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'coupoun',
        default: null
    },
    totalPay: {
        type: "",   // TODO: Insert valid type
        required: true
    },
    transectionObject: {
        type: String,
        require: true
    },
}, { timestamps: true })

const purchase = mongoose.model('purchase_history', PurchaseHistorySchema)

export default purchase