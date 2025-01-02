import mongoose, { Schema } from 'mongoose'

const ClientDataSchema = new Schema({
    quizes: {
        type: [Schema.Types.ObjectId],
        ref: 'quizes_response',
        default: []
    },
    series: {
        type: [Schema.Types.ObjectId],
        ref: 'series_response',
        default: []
    }
}, { timestamps: true })

const clientDataSchema = mongoose.model('client_data', ClientDataSchema)

export default clientDataSchema