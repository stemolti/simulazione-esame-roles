import { Router } from 'express';

import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

import { validate } from '../../utils/validation-middleware';
import { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById } from './event.controller';
import { CreateEventDto, UpdateEventDto } from './event.dto';

const router = Router();

router.use(isAuthenticated);

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', validate(CreateEventDto), createEvent);
router.put('/:id', validate(UpdateEventDto), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
