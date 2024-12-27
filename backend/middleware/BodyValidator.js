import { validationResult } from "express-validator";

const BodyValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            validationError: true,
            error: errors.array()
        });
    }

    next();
}

export default BodyValidator;