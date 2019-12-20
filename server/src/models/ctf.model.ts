import { Document, Schema, model } from "mongoose";

export type CTFDocument = Document & {
    version: string,
    about: string,
    startDate: Date,
    finishDate: Date,
};

const CTFSchema = new Schema({
version: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  startDate: {
      type: Date,
  },
  finishDate: {
      type: Date,
  }
});

export const CTF = model<CTFDocument>('CTF', CTFSchema);
