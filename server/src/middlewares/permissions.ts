import { Request, Response, NextFunction } from "express";
import { Writeup } from "../models/writeup.model";
import { UserDocument } from "../models/user.model";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.isAdmin) {
    return res.sendStatus(403);
  }

  return next();
};

export const isAuthorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserDocument;
  if (user.isAdmin) {
    return next();
  }
  const writeup = await Writeup.findById(req.params.id);

  if (writeup === null) {
    return res.json({ message: "Writeup not found" }).status(404);
  }

  // tslint:disable-next-line: triple-equals
  if (user.id == writeup.author) {
    return next();
  }

  return res.sendStatus(403);
};
