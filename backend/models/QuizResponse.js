import mongoose, { Schema } from 'mongoose'

const QuizResponseSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'quizes',
        required: true
    },
    response: {
        type: {
            questions: {
                type: [Schema.Types.ObjectId],
                ref: 'questions',
                required: true
            },
            answer: {
                type: [String],
                default: []
            }
        },
        required: true
    },
    status: {
        type: String,
        enum: ["In Progress", "Completed"],
        default: "In Progress"
    },
    startedAt: {
        type: Date,
        default: Date.now()
    },
    completedAt: {
        type: Date
    },
}, { timestamps: true })

const quizRes = mongoose.model('quiz_response', QuizResponseSchema)

export default quizRes