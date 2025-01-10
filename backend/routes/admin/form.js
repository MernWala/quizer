// TODO: These routes are not tested yetw

import express from 'express';
import ExpressValidator from "../../middleware/ExpressValidator.js"
import { validateLongString, validateMongoId, validateName } from "../../validation/bodyValidation.js"
import { validateMongoIdParam } from "../../validation/paramValidation.js"
import { addEnquiry, createCustomForm, DeleteForm, setRegister, viewDetails } from "../../controllers/form.js"
import { validateFormObject } from '../../validation/form.js';
import { param } from 'express-validator';

const router = express.Router();

// Note: Form edit is not allowed here

// Route 1: Form for register user{role: client} in quiz
router.post("/quiz/register",
    [validateMongoId("quizId"), validateName("form.name"), validateLongString("form.description"), validateFormObject("form.fields")],
    ExpressValidator, createCustomForm, setRegister
);

// Route 2: Form for quiz Enquire
router.post("/quiz/enquiry",
    [validateMongoId("quizId"), validateName("form.name"), validateLongString("form.description"), validateFormObject("form.fields")],
    ExpressValidator, createCustomForm, addEnquiry
);

// Route 3: Get forms details
router.get("/:quizId/:formId/:formType",
    [
        validateMongoIdParam("quizId"), validateMongoIdParam("formId"),
        param("formType").exists().withMessage("Form type not found").isString().withMessage("Invalid form type").custom(val => {
            if (val === "register" || val === "enquiry")
                return true
            throw new Error("Invalid for type value!")
        })
    ],
    ExpressValidator, viewDetails
);

// Route 4: Update particular form
router.delete("/:quizId/:formId/:formType",
    [
        validateMongoIdParam("quizId"), validateMongoIdParam("formId"),
        param("formType").exists().withMessage("Form type not found").isString().withMessage("Invalid form type").custom(val => {
            if (val === "register" || val === "enquiry")
                return true
            throw new Error("Invalid for type value!")
        })
    ],
    ExpressValidator, DeleteForm
);

export default router