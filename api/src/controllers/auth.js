import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import { User, Role } from '../models';

export const login = async (req, res) => {
    const access_token = jwt.sign(
        { sub: req.user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );

    return res.status(200).send({ 
        accessToken: access_token, 
        first_name: req.user.first_name, 
        last_name: req.user.last_name,
        email: req.user.email,
        phone: req.user.phone_number
    });
};

export const register = async (req, res, next) => {
    const { user_role } = req.body;

    try {
        // Assign role
        
        // Create access token
        const access_token = jwt.sign(
            { sub: req.user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
        );

        return res.status(200).send({ access_token, message: 'Successfully registered.'});
    } catch (error) {
        return next(createError(500, error.message));
    }
};
