import { Router } from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { validate } from '../../utils/validation-middleware';
import {
  subscribeEvent,
  unsubscribeEvent,
  checkinEvent,
} from './event-registration.controller';
import {
  CreateEventRegistrationDto,
  UpdateEventRegistrationDto,
} from './event-registration.dto';

const router = Router();

// Tutte le rotte richiedono autenticazione
router.use(isAuthenticated);

// POST /registrations/ - Iscrizione ad un evento
router.post(
  '/',
  validate(CreateEventRegistrationDto),
  subscribeEvent
);

// DELETE /registrations/:eventId - Disiscrizione da un evento
router.delete(
  '/:eventId',
  unsubscribeEvent
);

// PUT /registrations/:eventId/checkin - Registrazione check-in
router.put(
  '/:eventId/checkin',
  // Se vuoi validare eventuale payload di checkin
  // validate(UpdateEventRegistrationDto),
  checkinEvent
);

export default router;
