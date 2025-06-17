import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import eventRouter from './event/event.router';

const router = Router();

router.use('/users', userRouter);
router.use('/event', eventRouter);
router.use(authRouter);

export default router;
