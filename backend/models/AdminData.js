import mongoose, { Schema } from 'mongoose'
import QuizSchema from "./Quiz.js"
import SeriesSchema from "./Series.js"

const AdminDataSchema = new Schema({
    quizes: {
        type: [Schema.Types.ObjectId],
        ref: 'quizes',
        default: []
    },
    series: {
        type: [Schema.Types.ObjectId],
        ref: 'series',
        default: []
    }
}, { timestamps: true })

const adminDataSchema = mongoose.model('admin_data', AdminDataSchema)

export default adminDataSchema