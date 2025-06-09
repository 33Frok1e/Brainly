import express from 'express'
import { loginUserController, logoutUserController, registerUserController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUserController);

router.post('/login', loginUserController);

router.post('/logout', logoutUserController);

// TODO: Add /me router to check auth with middleware

export default router;