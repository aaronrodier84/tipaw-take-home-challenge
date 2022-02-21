import express from 'express';
import passport from 'passport';

import { getUser, createUser, updateUser, deleteUser } from '../controllers/user';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUser);
router.post('/', passport.authenticate('jwt', { session: false }), createUser);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteUser);

module.exports = router;
