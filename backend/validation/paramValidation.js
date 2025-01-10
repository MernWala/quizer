import { param } from 'express-validator';

export const validateMongoIdParam = (key) => param(key)
    .exists()
    .withMessage(`${key} ID not found`)
    .bail()
    .isMongoId()
    .withMessage(`${key} is not a valid MongoID.`);