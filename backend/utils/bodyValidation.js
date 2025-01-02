import { body } from 'express-validator'

export const validateName = (key) => body(key)
    .trim()
    .exists()
    .withMessage(`${key} not found!`)
    .isLength({ min: 3 })
    .withMessage(`${key} is too short!`);

export const validateRole = (key) => body(key)
    .trim()
    .exists()
    .withMessage(`${key} not found!"`)
    .custom((value) => {
        const validRole = ['client', 'admin'];
        if (validRole.indexOf(value) > 0)
            return true;
        throw Error(`${key} is not valid!`)
    });

export const validateEmail = (key) => body(key)
    .trim()
    .exists()
    .withMessage(`${key} not found!`)
    .isEmail()
    .withMessage(`${key} is not valid.`);

export const validatePassword = (key) => body(key)
    .trim()
    .exists()
    .withMessage(`${key} not found!`)
    .custom((value) => {
        const requirements = [
            { regex: /[a-z]/, message: "Password must contain at least one alphabet!" },
            { regex: /[0-9]/, message: "Password must contain at least one number!" },
            { regex: /[\W_]/, message: "Password must contain at least one special character!" },
        ];

        for (const { regex, message } of requirements) {
            if (!regex.test(value)) {
                throw new Error(message);
            }
        }

        return true; // Validation passed
    });

export const validateMongoId = (key) => body(key)
    .exists()
    .withMessage("Mongo ID not found")
    .isMongoId()
    .withMessage("Not a valid MongoID.")