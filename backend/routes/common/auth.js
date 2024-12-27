import express from 'express'
import BodyValidator from '../../middleware/BodyValidator.js'
import { validateJWT } from '../../utils/queryValidation.js'
import { validateEmail, validateName, validatePassword, validateRole } from '../../utils/bodyValidation.js'
import { ManualLogin, ManualRegister, ManualVerifyAccount, PasswordReset_Send, PasswordReset_Reset } from '../../controllers/auth.js'

const router = express.Router();

// Route 1: Manually register user
router.post("/register",
    [validateName("name"), validateRole("role"), validateEmail("email"), validatePassword("pass")],
    BodyValidator, ManualRegister
);

// Route 2: Manually verify accoount
router.get("/verify",
    [validateJWT("token")],
    BodyValidator, ManualVerifyAccount
);

// Route 3: Manually login user
router.post("/signin",
    [validateEmail("email"), validatePassword("pass")],
    BodyValidator, ManualLogin
);

// Route 4: Send recovery token via email
router.post("/password-reset/send", 
    [validateEmail("email")],
    BodyValidator, PasswordReset_Send
);

// Route 5: Verify recovery-token of email for Reset Password
router.post("/password-reset/send", 
    [validateJWT("token"), validatePassword("pass")],
    BodyValidator, PasswordReset_Reset
);

export default router;
