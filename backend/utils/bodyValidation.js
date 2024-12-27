import { body } from 'express-validator'

export const validateName = (key) => body(key)
    .trim()
    .exists()
    .withMessage("Name not found!")
    .isLength({ min: 3 })
    .withMessage("Name is too short!");

export const validateRole = (key) => body(key)
    .trim()
    .exists()
    .withMessage("Role not found!")
    .custom((value) => {
        const validRole = ['client', 'admin', 'super_admin'];
        if (validRole.indexOf(value) > 0)
            return true;
        throw Error("Role is not valid!")
    });

export const validateEmail = (key) => body(key)
    .trim()
    .exists()
    .withMessage("Email not found!")
    .isEmail()
    .withMessage("Email not found!");

export const validatePassword = (key) => body(key)
    .trim()
    .exists()
    .withMessage("Password not found!")
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