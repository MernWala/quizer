import mongoose, { Schema } from 'mongoose'

const FormSchema = new Schema({
    slug: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,   // It should store html string and will be parsed into react,
        trim: true
    },
    fields: {
        type: [Schema.Types.Mixed],
        required: true
    },
    stared: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: false
    },
    response: {
        type: [Schema.Types.Mixed],
        default: []
    }
}, { timestamps: true })

const form = mongoose.model('forms', FormSchema)

export default form