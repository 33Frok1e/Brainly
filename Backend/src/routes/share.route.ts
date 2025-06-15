import express from 'express'
import auth from '../middlewares/auth.middleware';
import validate from '../middlewares/validation.middleware';
import { createShareLinkValidation } from '../validations/share.validation';
import { createShareLinkController } from '../controllers/share.controller';

const router = express.Router();

router.use(auth);

router.post('/', validate(createShareLinkValidation), createShareLinkController)


export default router;