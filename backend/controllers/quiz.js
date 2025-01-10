import CustomError from '../middleware/ErrorMiddleware.js';
import QuizSchema from "../models/Quiz.js";
import getUser from "../hooks/getUser.js";
import AdminDataSchema from "../models/AdminData.js";
import QuestionSchema from "../models/Question.js"
import getAllQuizes from '../hooks/getAllQuizes.js';
import getAllQuestions from '../hooks/getAllQuestions.js';

export const CreateQuiz = async (req, res) => {
    try {
        const { name, quizType, visibility } = req.body;
        const { token } = req.cookies;

        const { error, mess, user } = await getUser(token);
        if (error) {
            return res.status(400).json({ error: true, message: mess });
        }

        const quiz = new QuizSchema({ name, quizType, visibility });
        await quiz.save();

        if (!user.adminData) {
            const adminData = new AdminDataSchema({ quizes: [quiz._id] });
            await adminData.save();

            user.adminData = adminData._id;
            await user.save();
        } else {
            await AdminDataSchema.findByIdAndUpdate(
                user.adminData,
                { $push: { quizes: quiz._id } },
            );
        }

        return res.status(201).json({
            success: true,
            message: "Quiz created successfully!",
            quiz,
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const AddQuestion = async (req, res) => {
    try {

        const { quizId, question: { question, section, options, answers, type, images } } = req.body;

        const { token } = req.cookies;
        const quizes = await getAllQuizes(token)
        if (!quizes || !quizes?.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to add questions to this quiz.",
            });
        }

        const newQuestion = new QuestionSchema({ question, section, options, answers, type, images });
        await newQuestion.save();

        await QuizSchema.findByIdAndUpdate(quizId, { $push: { questions: newQuestion._id } });

        return res.status(201).json({
            success: true,
            message: "Question added successfully!",
            question: newQuestion,
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const UpdateQuestion = async (req, res) => {
    try {

        const { quizId, questionId, question: { question, section, options, answers, type, images } } = req.body;
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token)
        if (!quizes || !quizes?.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to update a questions from this quiz.",
            });
        }

        const allQuestions = await getAllQuestions(quizId);
        if (!allQuestions || !allQuestions.includes(questionId)) {
            return res.status(404).json({
                success: false,
                message: "Question not found.",
            });
        }

        const update = await QuestionSchema.findByIdAndUpdate(questionId, {
            question, section: section.length === 0 ? null : section.trim(), options, answers, type, images
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Question updated successfully!",
            update,
        });

    } catch (error) {
        CustomError(error, res)
    }
};

export const DeleteQuestion = async (req, res) => {
    try {

        const { quizId, questionId } = req.params;
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token)
        if (!quizes || !quizes?.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to delete questions from this quiz.",
            });
        }

        const allQuestions = await getAllQuestions(quizId);
        if (!allQuestions || !allQuestions.includes(questionId)) {
            return res.status(404).json({
                success: false,
                message: "Question not found.",
            });
        }

        await QuestionSchema.findByIdAndDelete(questionId);
        await QuizSchema.findByIdAndUpdate(quizId,
            { $pull: { questions: questionId } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Question deleted successfully!",
        });

    } catch (error) {
        CustomError(error, res)
    }
};

export const DeleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token);

        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to delete this quiz.",
            });
        }

        const quiz = await QuizSchema.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found.",
            });
        }

        // Delete all questions associated with the quiz
        await QuestionSchema.deleteMany({ _id: { $in: quiz.questions } });

        // Delete the quiz
        await QuizSchema.findByIdAndDelete(quizId);

        // Remove the quiz reference from the admin data
        await AdminDataSchema.findOneAndUpdate(
            { quizes: quizId },
            { $pull: { quizes: quizId } }
        );

        res.status(200).json({
            success: true,
            message: "Quiz and associated questions deleted successfully!",
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const UpdateQuiz = async (req, res) => {
    try {

        const { quizId, options: { name, quizType, visibility, publishOn, totalTime, expireOn, sectionSwitch, register, enquiry } } = req.body
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token)
        if (!quizes || !quizes?.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to update this quiz.",
            });
        }

        const update = await QuizSchema.findByIdAndUpdate(
            { _id: quizId }, {
            $set: {
                name, quizType, visibility, publishOn, totalTime, expireOn, sectionSwitch, register, enquiry
            }
        })

        return res.json({
            success: true,
            message: "Quiz has been updated with latest chnages!",
            update
        })

    } catch (error) {
        CustomError(error, res)
    }
};

export const GetAllQuiz = async (req, res) => {
    try {
        const { token } = req.cookies;
        const quizIds = await getAllQuizes(token);

        if (!quizIds || quizIds.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No quizzes found.",
            });
        }

        const quizzes = await QuizSchema.find({ _id: { $in: quizIds } })

        return res.status(200).json({
            success: true,
            quizzes,
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const GetQuizDetails = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to view this quiz.",
            });
        }

        const quiz = await QuizSchema.findById(quizId).populate('questions').populate('register').populate('enquiry');
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found.",
            });
        }

        return res.status(200).json({
            success: true,
            quiz,
        });
    } catch (error) {
        CustomError(error, res);
    }
};