import { Types } from "mongoose";

export interface EventRegistration {
  id?: string;
  user: Types.ObjectId;
  event: Types.ObjectId;
  checkinDone: boolean;
  checkinTime?: Date;
}