import createError from 'http-errors';
import path from 'path';

export const getUser = async (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Called Get API' });
    } catch (error) {
        return next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Profile image successfully updated' });
    } catch (error) {
        return next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Profile image successfully updated' });
    } catch (error) {
        return next(error);
    }
}