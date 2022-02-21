import express from 'express';
import passport from 'passport';
import { authenticate } from '../middlewares/auth';

import { login, register, forgotPassword, resetPassword, changePassword } from '../controllers/auth';

const router = express.Router();

router.post('/login', authenticate('login'), login);
router.post('/register', authenticate('register'), register);
module.exports = router;