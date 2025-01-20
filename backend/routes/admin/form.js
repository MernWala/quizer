// TODO: These routes are not tested yet
import express from 'express';
import ExpressValidator from "../../middleware/ExpressValidator.js"
import { validateBoolean, validateLongString, validateMongoId, validateName } from "../../validation/bodyValidation.js"
import { validateMongoIdParam } from "../../validation/paramValidation.js"
import { addEnquiry, createCustomForm, DeleteForm, setRegister, UpdateForm, viewDetails } from "../../controllers/form.js"
import { validateFormObject } from '../../validation/form.js';

const router = express.Router();

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
router.get("/:quizId/:formId",
    [validateMongoIdParam("quizId"), validateMongoIdParam("formId")],
    ExpressValidator, viewDetails
);

// Route 4: Delete particular form
router.delete("/:quizId/:formId",
    [validateMongoIdParam("quizId"), validateMongoIdParam("formId")],
    ExpressValidator, DeleteForm
);

// Route 5: Update particular form and give access to remove all captured data
router.put("/:quizId/:formId",
    [
        validateMongoIdParam("quizId"), validateMongoIdParam("formId"), validateName("form.name"),
        validateLongString("form.description"), validateFormObject("form.fields"), validateBoolean("truncate"),
    ],
    ExpressValidator, UpdateForm
);

export default router