import express from 'express'
import BodyValidator from '../../middleware/BodyValidator.js'
import { validateJWT } from '../../validation/queryValidation.js'
import { validateEmail, validateName, validatePassword, validateRole } from '../../validation/bodyValidation.js'
import {
    ManualLogin,
    ManualRegister,
    ManualVerifyAccount,
    PasswordReset_Send,
    PasswordReset_Reset,
    ReactivateAccount_Send,
    DeactivateAccount,
    ReactivateAccount_Activate
} from '../../controllers/auth.js'
import { AdminAuthorityCheck } from '../../validation/AuthorityCheck.js'

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
router.post("/password-reset/reset",
    [validateJWT("token"), validatePassword("pass")],
    BodyValidator, PasswordReset_Reset
);

// Route 6: Account deactivate
router.post("/deactivate-account",
    [validatePassword("pass")],
    AdminAuthorityCheck, BodyValidator, DeactivateAccount
)

// Route 7: Account activate send
router.post("/activate-account/send",
    [validateEmail("email")],
    BodyValidator, ReactivateAccount_Send, PasswordReset_Send
)

// Route 8: Account activate activate
router.post("/activate-account/activate",
    [validateJWT("token")],
    BodyValidator, ReactivateAccount_Activate
)

export default router;
