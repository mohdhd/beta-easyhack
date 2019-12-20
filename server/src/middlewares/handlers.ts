import { Request, Response, NextFunction} from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction ) {
    // console.error(err.stack);
    return res.json({
        message: err.message,
        name: err.name,
        stackTrace: err.stack,
    }).status(500);
}
