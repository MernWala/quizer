import mongoose, { Schema } from 'mongoose'

const SeriesResponseSchema = new Schema({
    series: {
        type: Schema.Types.ObjectId,
        ref: 'series',
        required: true
    },
    response: {
        type: [Schema.Types.ObjectId],
        ref: 'quiz_response',
    },
    status: {
        type: String,
        enum: ["In Progress", "Completed"],
        default: "In Progress"
    },
    completedAt: {
        type: Date
    },
}, { timestamps: true })

const seriesRes = mongoose.model('quiz_response', SeriesResponseSchema)

export default seriesRes