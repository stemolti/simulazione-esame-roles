// models/event.entity.ts
import mongoose from 'mongoose';
import { Event as IEvent } from './event.entity';

export const eventSchema = new mongoose.Schema<IEvent>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: false },
});

eventSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

eventSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const EventModel = mongoose.model<IEvent>('Event', eventSchema);
