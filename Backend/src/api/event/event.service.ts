import { EventModel } from "./event.model";
import { Event } from "./event.entity";

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    return EventModel.find().exec();
  },

  getEventById: async (id: string): Promise<Event | null> => {
    return EventModel.findById(id).exec();
  },

  createEvent: async (data: {
    title: string;
    date: Date;
    description?: string;
  }): Promise<Event> => {
    return EventModel.create({
      title: data.title,
      date: data.date,
      description: data.description,
    });
  },

  updateEvent: async (
    id: string,
    data: Partial<{
      title?: string;
      date?: Date;
      description?: string;
    }>
  ): Promise<Event | null> => {
    const event = await EventModel.findById(id);
    if (!event) return null;

    Object.assign(event, data);
    return event.save();
  },

  deleteEvent: async (id: string): Promise<Event | null> => {
    const event = await EventModel.findById(id);
    if (!event) return null;

    // remove() is deprecated, use deleteOne()
    await event.deleteOne();
    return event;
  },
};
