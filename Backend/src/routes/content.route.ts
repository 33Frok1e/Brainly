import express from 'express'
import { createContentController, updateContentController, getContents, getContent, deleteContent } from '../controllers/content.controller';
import auth from '../middlewares/auth.middleware';
import validate from '../middlewares/validation.middleware';
import { createContentValidation, getContentsValidation, updateContentValidation } from '../validations/content.validation';

const router = express.Router();

router.use(auth)

router.post('/create', validate(createContentValidation) , createContentController); 
router.put('/update/:id', validate(updateContentValidation), updateContentController);
router.get('/', validate(getContentsValidation), getContents);
router.get('/:id', getContent);
router.delete('/delete/:id', deleteContent);

export default router;