import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ message: "Only admins users can do that"});
};
