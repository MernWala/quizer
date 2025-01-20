import QuizSchema from "../models/Quiz.js"

const getAllForms = async (quizId) => {
    try {

        const quiz = await QuizSchema.findById(quizId);
        const forms = [];

        if (quiz?.register) {
            forms.push(quiz?.register);
        }

        for (let id in quiz?.enquiry) {
            forms.push(id)
        }

        return forms ?? null

    } catch (error) {
        console.log("GETTING_ALL_FORMS_ERROR - getAllForms.js: 20");
        return null
    }
}

export default getAllForms;