import express from 'express'
import quizRoutes from './quiz.js'
import formRoutes from "./form.js"
import { AdminAuthorityCheck } from '../../validation/authorityCheck.js';

const router = express.Router()


// Middleware pass for admin authority check
router.use(AdminAuthorityCheck);


// Route 1: Authentication || Register, Account Verify, Signin
router.use("/quiz", quizRoutes);

// Route 2: Forms - Google form clone
router.use("/form", formRoutes)



export default router;