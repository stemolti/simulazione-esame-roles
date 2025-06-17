// controllers/event.controller.ts
import { Request, Response } from 'express';
import { eventService } from './event.service';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getEvents();
    res.json(events);
    return;
  } catch (err) {
    res.status(500).send('Server error');
    return;
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      res.status(404).send('Event not found');
      return;
    }
    res.json(event);
    return;
  } catch (err) {
    res.status(500).send('Server error');
    return;
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, date, description } = req.body;
    const newEvent = await eventService.createEvent({
      title,
      date: new Date(date),
      description,
    });
    res.status(201).json(newEvent);
    return;
  } catch (err) {
    res.status(500).send('Server error');
    return;
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const updates: any = { ...req.body };
    if (req.body.date) {
      updates.date = new Date(req.body.date);
    }
    const updated = await eventService.updateEvent(req.params.id, updates);
    if (!updated) {
      res.status(404).send('Event not found');
      return;
    }
    res.json(updated);
    return;
  } catch (err) {
    res.status(500).send('Server error');
    return;
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);
    if (!deleted) {
      res.status(404).send('Event not found');
      return;
    }
    res.json({ message: 'Deleted' });
    return;
  } catch (err) {
    res.status(500).send('Server error');
    return;
  }
};
