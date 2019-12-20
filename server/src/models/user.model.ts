import { Document, Schema, Error, model } from "mongoose";
import bcrypt from "bcryptjs";
import { uuid } from "uuidv4";
import { ChallengeDocument } from "./challenge.model";
import { NotificationDocument } from "./notification";

export type UserDocument = Document & {
  // user definition
  username: string;
  password: string;
  email: string;
  score: number;
  liveScore: number;
  hash: string;
  passwordHash: string;
  active: boolean;
  isAdmin: boolean;
  solvedChallenges: [ChallengeDocument];
  comparePassword: comparePasswordFunction;
  setPassword: setPasswordFunction;
  notifications: [NotificationDocument];
  unreadNotification: boolean;
  flagSubmitTime:Number;
  liveFlagSubmitTime:Number;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
type setPasswordFunction = (password: string) => Promise<any>;

const userSchema = new Schema({
  // user schema
  username: {
    type: String,
    minlength: 5,
    required: true,
    match: /[a-zA-Z0-9_]/,
    unique: true,
  },
  email: {
    type: String,
    minlength: 7,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
    min: 0,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
  active: {
    default: false,
    type: Boolean,
  },
  solvedChallenges: {
    ref: "Challenge",
    type: [Schema.Types.ObjectId],
    default: [],

  },
  password: {
    type: String,
    required: true
  },
  hash: {
    type: String,
  },
  passwordHash: {
    type: String
  },
  notifications: {
    type: [Schema.Types.ObjectId],
    ref: "Notification",
    default: [],
  },
  liveScore: {
    type: Number,
    default: 0,
    min: 0,
  },
  unreadNotification: {
    type: Boolean,
    default: false
  },
  flagSubmitTime:{
    type:Number,
  },
  liveFlagSubmitTime:{
    type:Number
  }

});

/**
 * Compare password string with user.password
 * @param password The password's sting, it will be compared with user.password
 * @param cb callback will be invoked after finishing the comparisons
 */
const comparePassword: comparePasswordFunction = function (password: string, cb: Function) {
  bcrypt.compare(password, this.password, (err: Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

/**
 * Please do not remove it's used in a new part of the code
 * @param password The new password
 */
const setPassword: setPasswordFunction = function (password: string) {
  const user = this as UserDocument;
  return bcrypt.hash(password, 8).
    then((hash: string) => {
      user.password = hash;
      return user.save({ validateBeforeSave: false });
    });
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.setPassword = setPassword;
userSchema.index({ username: 1, email: 1 });

export const User = model<UserDocument>("User", userSchema);
