import express from 'express'
import { getCurrentUser, logoutController, signInController, signUpController } from '../controllers/auth.controller';
import validate from '../middlewares/validation.middleware';
import auth from '../middlewares/auth.middleware';
import { signinValidation, signupValidation } from '../validations/auth.validation';

const router = express.Router();

router.post('/signup', validate(signupValidation), signUpController);
router.post('/signin', validate(signinValidation), signInController);
router.post('/logout', auth, logoutController);
router.get('/me', auth, getCurrentUser);

export default router;