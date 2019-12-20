import { Document, Schema, model } from "mongoose";

export type NotificationDocument = Document & {
    event: string;
    message: string;
    createdAt: Date;
    removeAt: Date;
    isRead: boolean;
};

const NotificationSchema = new Schema({
event: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
      type: Date,
  },
  removeAt: {
      type: Date,
  },
  isRead: {
      type: Boolean,
      default: false,
  },
});

export const Notification = model<NotificationDocument>('Notification', NotificationSchema);
