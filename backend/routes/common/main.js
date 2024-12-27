import express from 'express'
import AuthRoute from './auth.js'

const router = express.Router()


// Route 1: Authentication || Register, Account Verify, Signin
router.use("/auth/manual", AuthRoute);

export default router;