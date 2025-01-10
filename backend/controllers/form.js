import CustomError from "../middleware/ErrorMiddleware.js";
import getAllQuizes from '../hooks/getAllQuizes.js';
import FormSchema from "../models/Form.js";
import QuizSchema from "../models/Quiz.js";
import { compareString } from "../utils/Genral.js";
import slug from "slug"

export const createCustomForm = async (req, res, next) => {
    try {
        const { quizId, form: { name, description, fields } } = req.body;
        const { token } = req.cookies;
        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to change this quiz.",
            });
        }

        const form = new FormSchema({ name, description, fields });
        form.slug = slug(`${form?._id} ${name}`)
        await form.save();

        req.data = {
            form: form._id,
            slug: form?.slug
        };

        next();
    } catch (error) {
        CustomError(error, res);
    }
};

export const setRegister = async (req, res) => {
    try {
        const { quizId, data: { form, slug } } = req.data;
        const update = await QuizSchema.findByIdAndUpdate(
            quizId,
            { $set: { register: form } },
            { new: true }
        ).populate("register");

        return res.json({
            success: true,
            message: "Form added successfully.",
            update,
            slug
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const addEnquiry = async (req, res) => {
    try {
        const { quizId, data: { form, slug } } = req.data;
        const update = await QuizSchema.findByIdAndUpdate(
            quizId,
            { $push: { enquiry: form } },
            { new: true }
        ).populate("register");

        return res.json({
            success: true,
            message: "Form added successfully.",
            update,
            slug
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const viewDetails = async (req, res) => {
    try {
        const { quizId, formId, formType } = req.params;
        const { token } = req.cookies;
        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to view this quiz.",
            });
        }

        const data = await QuizSchema.findOne({ _id: quizId });
        if (!data) {
            return res.status(404).json({
                error: true,
                message: "Form not found!"
            });
        }

        if (data[formType] && compareString(JSON.stringify(data.register), JSON.stringify(formId))) {
            await data.populate("register")
            return res.json(data?.register);
        }

        if (data[formType] && data.enquiry.includes(formId)) {
            await data.populate({ path: "enquiry", match: { _id: formId } })
            return res.json(data?.enquiry?.[0]);
        }

        return res.status(404).json({
            error: true,
            message: "Form not found!"
        });
    } catch (error) {
        CustomError(error, res);
    }
};

export const DeleteForm = async (req, res) => {
    try {
        const { quizId, formId, formType } = req.params;
        const { token } = req.cookies;
        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to change this quiz.",
            });
        }

        const quiz = await QuizSchema.findById(quizId);

        if (formType === "register" && compareString(JSON.stringify(quiz.register), JSON.stringify(formId))) {
            quiz.register = null;
            await quiz.save();

            await FormSchema.findByIdAndDelete(formId);

            return res.status(200).json({
                success: true,
                message: "Form has been deleted"
            });
        }

        if (formType === "enquiry" && quiz.enquiry.includes(formId)) {
            quiz.enquiry = quiz.enquiry.filter(e => !compareString(JSON.stringify(e), JSON.stringify(formId)));
            await quiz.save();

            await FormSchema.findByIdAndDelete(formId);

            return res.status(200).json({
                success: true,
                message: "Form has been deleted"
            });
        }

        return res.status(404).json({
            success: false,
            message: "Form not found."
        });
    } catch (error) {
        CustomError(error, res);
    }
};
