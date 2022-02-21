import { body, validationResult } from 'express-validator';
import createError from 'http-errors';

const registerValidationRules = [
    body('first_name')
        .not().isEmpty()
        .withMessage('First name is required'),
    body('last_name')
        .not().isEmpty()
        .withMessage('Last name is required'),
    body('phone_number')
        .not().isEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone()
        .withMessage('Please enter a valid Phone number'),
    body('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .matches({pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"})
        .withMessage('Minumum 8 characters, with atleast one uppercase letter, one number and one special character')
];

const loginValidationRules = [
    body('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .not().isEmpty()
        .withMessage('Password is required'),
];

export const validate = (type) => async (req, res, next) => {
    let validationRules;
    let nType = type;
    if (!nType) nType = req.url.split('/').pop();

    switch (nType) {
        case 'register':
            validationRules = registerValidationRules;
            break;
        case 'login':
            validationRules = loginValidationRules;
            break;
        default:
            validationRules = null;
    }

    try {
        if (!validationRules) {
            throw createError(400, 'Validate type is not valid.');
        }

        await Promise.all(validationRules.map((validationRule) => validationRule.run(req)));

        const errors = myValidationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        const error = {
            statusCode: 400,
            message: errors.array(),
        };

        return next(error);
    } catch (error) {
        return next(error);
    }
};
