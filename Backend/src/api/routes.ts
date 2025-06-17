import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import eventRouter from './event/event.router';
import eventRegRouter from './event-registration/event-registration.router';

const router = Router();

router.use('/users', userRouter);
router.use('/event', eventRouter);
router.use('/registration', eventRegRouter);

router.use(authRouter);

export default router;
