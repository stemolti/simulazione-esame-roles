import mongoose from 'mongoose';
import { EventRegistration as IEventRegistration } from './event-registration.entity';

const eventRegistrationSchema = new mongoose.Schema<IEventRegistration>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  checkinDone: { type: Boolean, required: true, default: false },
  checkinTime: { type: Date, required: false },
});

// Remove internal fields and include virtuals when converting to JSON
eventRegistrationSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Same behavior for toObject
eventRegistrationSchema.set('toObject', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const EventRegistrationModel = mongoose.model<IEventRegistration>(
  'EventRegistration',
  eventRegistrationSchema
);