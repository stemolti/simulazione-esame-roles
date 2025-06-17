import { Request, Response } from 'express';
import { CreateEventRegistrationDto, UpdateEventRegistrationDto } from './event-registration.dto';
import { eventRegistrationService } from './event-registration.service';

// POST /registrations
export const subscribeEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send('Unauthorized');
      return;
    }
    const dto: CreateEventRegistrationDto = req.body;
    const registration = await eventRegistrationService.subscribe(req.user, dto.event);
    res.status(201).json(registration);
  } catch (err: any) {
    if (err.message === 'Evento non trovato') {
      res.status(404).send(err.message);
      return;
    }
    res.status(500).send('Server error');
  }
};

// DELETE /registrations/:eventId
export const unsubscribeEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send('Unauthorized');
      return;
    }
    const { eventId } = req.params;
    const registration = await eventRegistrationService.unsubscribe(req.user, eventId);
    if (!registration) {
      res.status(404).send('Registration not found');
      return;
    }
    res.json(registration);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// PUT /registrations/:eventId/checkin
export const checkinEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send('Unauthorized');
      return;
    }
    const { eventId } = req.params;
    // dto could contain checkinTime or checkinDone, but service uses current time
    const registration = await eventRegistrationService.checkin(req.user, eventId);
    if (!registration) {
      res.status(404).send('Registration not found');
      return;
    }
    res.json(registration);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
