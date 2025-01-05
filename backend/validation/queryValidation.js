import { query } from "express-validator"

export const validateJWT = (key) => {
    return query(key)
        .notEmpty()
        .withMessage(`${key.toLocaleUpperCase()} not found!`)
        .isJWT()
        .withMessage("Invalid token!")
}