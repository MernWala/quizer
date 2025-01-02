import mongoose, { Schema } from 'mongoose'

const QuestionSchema = new Schema({
    question: {
        type: String,   // It should store html string and will be parsed into react code
        required: true,
        trim: true
    },
    sections: {
        type: String,
    },
    options: {
        type: [String],
        required: true,
        trim: true,
        validate: [options => options.length >= 2, 'There must be at least 2 options'],
    },
    answers: {
        type: [String],
        required: true,
        trim: true
    },
    quizType: {
        type: String,
        enum: ["single_choice", "multi_choice"],
        default: "single_choice",
    }
}, { timestamps: true })

const question = mongoose.model('questions', QuestionSchema)

export default question