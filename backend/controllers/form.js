import CustomError from "../middleware/ErrorMiddleware.js";
import getAllQuizes from '../hooks/getAllQuizes.js';
import FormSchema from "../models/Form.js";
import QuizSchema from "../models/Quiz.js";
import { compareString } from "../utils/Genral.js";
import slug from "slug"
import getAllForms from "../hooks/getAllForms.js";

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
        const { quizId, formId } = req.params;
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to view this quiz.",
            });
        }

        const forms = await getAllForms(quizId);
        if (forms !== null && forms.includes(formId)) {
            const data = await FormSchema.findById(formId);
            return res.json(data)
        } else {
            return res.status(404).json({
                error: true,
                message: "Form not found!"
            });
        }

    } catch (error) {
        CustomError(error, res);
    }
};

export const DeleteForm = async (req, res) => {
    try {
        const { quizId, formId } = req.params;
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found.",
            });
        }

        const forms = await getAllForms(quizId);
        if (!forms || !forms.includes(formId)) {
            return res.status(404).json({
                error: true,
                message: "Form not found!"
            });
        }

        const quiz = await QuizSchema.findById(quizId);
        if (data?.register && compareString(JSON.stringify(formId), JSON.stringify(data?.register))) {
            quiz.register = null;
            await quiz.save();

            await FormSchema.findByIdAndDelete(formId);

            return res.status(200).json({
                success: true,
                message: "Form has been deleted"
            });
        } else {
            quiz.enquiry = quiz.enquiry.filter(e => !compareString(JSON.stringify(e), JSON.stringify(formId)));
            await quiz.save();

            await FormSchema.findByIdAndDelete(formId);

            return res.status(200).json({
                success: true,
                message: "Form has been deleted"
            });
        }

    } catch (error) {
        CustomError(error, res);
    }
};

export const UpdateForm = async (req, res) => {
    try {
        const { quizId, formId } = req.params;
        const { name, description, fields, truncate } = req.body
        const { token } = req.cookies;

        const quizes = await getAllQuizes(token);
        if (!quizes || !quizes.includes(quizId)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to change this quiz.",
            });
        }

        const forms = await getAllForms(quizId);
        if (!forms || !forms.includes(formId)) {
            return res.status(404).json({
                error: true,
                message: "Form not found!"
            });
        }

        const updateData = { name, description, fields };
        if (truncate) {
            updateData.response = [];
        }

        const update = await FormSchema.findByIdAndUpdate(formId, { $set: updateData }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Form has been updated",
            update
        });

    } catch (error) {
        CustomError(error, res);
    }
};
