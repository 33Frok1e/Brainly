import express from 'express'
import { getCurrentUser, logoutController, signInController, signUpController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/logout', logoutController);
router.get('/me', getCurrentUser);

export default router;