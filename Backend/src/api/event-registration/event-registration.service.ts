import { Types } from 'mongoose';
import { User } from '../user/user.entity';
import { EventRegistrationModel } from './event-registration.model';
import { EventModel } from '../event/event.model';

export const eventRegistrationService = {
  // Iscrizione ad un evento
  subscribe: async (user: User, eventId: string) => {
    const eventObjectId = new Types.ObjectId(eventId);
    // Verifica esistenza evento
    const evento = await EventModel.findById(eventObjectId);
    if (!evento) {
      throw new Error('Evento non trovato');
    }
    // Verifica se già iscritto
    const existing = await EventRegistrationModel.findOne({ user: user.id, event: eventObjectId });
    if (existing) {
      return existing;
    }
    // Crea registrazione
    return EventRegistrationModel.create({
      user: user.id,
      event: eventObjectId,
      checkinDone: false,
    });
  },

  // Disiscrizione da un evento
  unsubscribe: async (user: User, eventId: string) => {
    const eventObjectId = new Types.ObjectId(eventId);
    // Trova registrazione
    const registration = await EventRegistrationModel.findOne({ user: user.id, event: eventObjectId });
    if (!registration) {
      return null;
    }
    // Elimina registrazione
    await registration.deleteOne();
    return registration;
  },

  // Registrazione check-in
  checkin: async (user: User, eventId: string) => {
    const eventObjectId = new Types.ObjectId(eventId);
    // Trova registrazione
    const registration = await EventRegistrationModel.findOne({ user: user.id, event: eventObjectId });
    if (!registration) {
      return null;
    }
    // Imposta check-in
    registration.checkinDone = true;
    registration.checkinTime = new Date();
    return registration.save();
  },
};
