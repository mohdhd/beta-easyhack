import { Document, Schema, model } from "mongoose";
import { UserDocument } from "./user.model";
import { ChallengeDocument } from "./challenge.model";

export type WriteupDocument = Document & {
  author: UserDocument,
  challenge: ChallengeDocument,
  content: string,
};

const writeupSchema = new Schema({
  author: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
  challenge: {
    ref: 'Challenge',
    required: true,
    type: Schema.Types.ObjectId,
  },
  content: {
    required: true,
    type: String,
  },
});

// tslint:disable-next-line: variable-name
export const Writeup = model<WriteupDocument>('Writeup', writeupSchema);
