import express from 'express'
import authRoute from './auth.route'
import contentRoute from './content.route'
import tagRoute from './tag.route'
import shareRoute from './share.route'


const router = express.Router();

router.use('/auth', authRoute);
router.use('/content', contentRoute);
router.use('/tag', tagRoute);
router.use('/share', shareRoute);

export default router;