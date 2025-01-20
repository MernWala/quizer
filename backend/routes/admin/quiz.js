import express from 'express';
import { AddQuestion, CreateQuiz, DeleteQuestion, DeleteQuiz, GetAllQuiz, GetQuizDetails, UpdateQuestion, UpdateQuiz } from '../../controllers/quiz.js';
import { validateBoolean, validateLongString, validateMongoId, validateName, validateStringArray } from '../../validation/bodyValidation.js';
import { validateQuizType, validateQuestionType, validateQuestionSection, validateQuestionUrlArray, validateDate, validateTotalTime } from "../../validation/question.js"
import ExpressValidator from '../../middleware/ExpressValidator.js'
import { validateMongoIdParam } from '../../validation/paramValidation.js';

const router = express.Router();

// Route 1: Preparing new quiz
router.post("/create/quiz",
    [
        validateName("name"), validateQuizType("quizType"), validateBoolean("visibility"),
        validateDate("publishOn"), validateTotalTime("totalTime"), validateDate("expireOn"),
        validateBoolean("sectionSwitch")
    ],
    ExpressValidator, CreateQuiz
);

// Route 2: Adding questions to the quiz
router.post("/add/question",
    [
        validateMongoId("quizId"), validateLongString("question.question"), validateQuestionSection("question.section"),
        validateStringArray("question.options"), validateStringArray("question.answers"), validateQuestionType("question.type"),
        validateQuestionUrlArray("question.images"),
    ],
    ExpressValidator, AddQuestion
);

// Route 3: Updating questions in the quiz
router.put("/update/question",
    [
        validateMongoId("quizId"), validateMongoId("questionId"), validateLongString("question.question"),
        validateQuestionSection("question.section"), validateStringArray("question.options"), validateQuestionUrlArray("question.images"),
        validateStringArray("question.answers"), validateQuestionType("question.type")
    ],
    ExpressValidator, UpdateQuestion
);

// Route 4: Deleting questions from the quiz
router.delete("/delete/question/:quizId/:questionId",
    [validateMongoIdParam("quizId"), validateMongoIdParam("questionId")],
    ExpressValidator, DeleteQuestion
);

// Route 5: Deleting a quiz
router.delete("/:quizId",
    [validateMongoIdParam("quizId")],
    ExpressValidator, DeleteQuiz
);

// Route 6: Update a quiz
router.put("/update/quiz",
    [
        validateMongoId("quizId"), validateName("option.name"), validateQuizType("option.quizType"),
        validateBoolean("option.visibility"), validateDate("option.publishOn"), validateTotalTime("option.totalTime"),
        validateDate("option.expireOn"), validateBoolean("option.sectionSwitch"),
    ],
    ExpressValidator, UpdateQuiz
);

// Route 7: Get all quiz short-details
router.get("/", GetAllQuiz);

// Router 8: Get particular quiz details
router.get("/:quizId",
    [validateMongoIdParam("quizId")], 
    ExpressValidator, GetQuizDetails
);

export default router;