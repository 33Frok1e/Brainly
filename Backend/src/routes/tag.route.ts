import express from 'express'
import auth from '../middlewares/auth.middleware';
import validate from '../middlewares/validation.middleware';
import { createTagValidation } from '../validations/tag.validation';
import { createTagController } from '../controllers/tag.controller';

const router = express.Router();

router.use(auth);

router.post('/create-tag', validate(createTagValidation), createTagController);
router.get('/tags', getTagsController);
router.delete('/delete-tag/:id', deleteTagController);

export default router;