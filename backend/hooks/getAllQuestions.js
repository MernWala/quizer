import QuizSchema from "../models/Quiz.js"

const getAllQuestions = async (quizId) => {
    try {

        const questions = await QuizSchema.findById({ _id: quizId }).select("questions")
        return questions?.questions ?? null

    } catch (error) {
        console.log("GET_ALL_QUESTION_ERROR getAllQuestion.js:",)
        return null
    }
}

export default getAllQuestions