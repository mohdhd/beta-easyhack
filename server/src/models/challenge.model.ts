import { Document, Schema, Error, model } from "mongoose";
import { UserDocument } from "./user.model";

export type ChallengeDocument = Document & {
  active: boolean,
  archived: boolean,
  live: boolean,
  author: UserDocument,
  details: string,
  difficulty: "Easy" | "Medium" | "Advanced",
  category: string,
  file: string,
  flag: string,
  score: number,
  solves: number,
  submissions: number,
  title: string,
};

const challengeSchema = new Schema({
  active: {
    default: true,
    type: Boolean,
  },
  archived: {
    default: false,
    type: Boolean,
  },
  live: {
    default: false,
    type: Boolean,
  },
  author: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  category: {
    required: true,
    type: String,
  },
  details: {
    required: false,
    type: String,
  },
  difficulty: {
    enum: ['Easy', 'Medium', 'Advanced'],
    required: true,
    type: String,
  },
  file: {
    required: false,
    type: String,
  },
  flag: {
    required: true,
    select: false,
    type: String,
  },
  score: {
    min: 0,
    required: true,
    type: Number,
  },
  solves: {
    default: 0,
    type: Number,
  },
  submissions: {
    default: 0,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
});

// tslint:disable-next-line: variable-name
export const Challenge = model<ChallengeDocument>('Challenge', challengeSchema);
