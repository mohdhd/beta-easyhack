
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { Notification } from '../models/notification';
import { mail, recoverUserPassword } from '../config/mail';
import { uuid } from 'uuidv4';



/**
 * @description findAll gets all the users in the DB
 */
export const findAll = async (req: Request, res: Response, next: any) => {
    try {
        const users = await User.find({ username: { $ne: 'admin' } })
            .select({ username: 1, score: 1, solvedChallenges: 1, liveScore: 1 });
        return res.json({ users });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description findOne gets a single user by its id
 */
export const findOne = async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ _id: id })
            .select({ username: 1, score: 1, solvedChallenges: 1, liveScore: 1 });
        return res.json({ user });
    } catch (error) {
        return next(error);
    }
};

export const findSolvedChallenges = async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ _id: id }, { password: 0 })
            .populate({ path: 'notifications', model: 'Notification' });
        return res.json({ solvedChallenges: user.solvedChallenges });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description updateOne updates an authenticated user by its id
 * the id is not required in this function but it's used only for
 * code consistency
 */

export const updateOne = async (req: Request, res: Response, next: any) => {
    const body = req.body;
    const user = req.user;
    const updatedFields = _.pick(body, ['username', 'score', 'email']);
    if (!user) {
        return res.sendStatus(403);
    }
    try {
        const existingUser = await User.findOne({ username: updatedFields.username.toLowerCase() });
        if (existingUser) {
            return res.json({ message: 'Username already exists' });
        }
        const doc = await User.findByIdAndUpdate(user.id, updatedFields, { new: true });
        return res.json({ message: 'updated successfully', user: doc });
    } catch (error) {
        return next(error);
    }
};

/**
 * @description deleteOne deletes an authenticated user by its id
 * the id is not required in this function but it's used only for
 * code consistency
 */
export const deleteOne = async (req: Request, res: Response, next: any) => {
    const user = req.user;
    if (!user) {
        return res.sendStatus(403);
    }
    try {
        const doc = await User.findByIdAndDelete(req.params.id);
        return res.json({ message: 'deleted successfully', user: doc });
    } catch (error) {
        return next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ info });
        }

        const payload = {
            id: user.id,
            isAdmin: user.isAdmin,
            score: user.score,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_KEY);
        return res.json({ user, token });
    })(req, res, next);

};

export const signup = async (req: Request, res: Response, next: any) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username:username.toLowerCase() });
        const existingEmail = await User.findOne({ email:email.toLowerCase() })
        if (existingUser) {
            return res.json({ error: true, message: 'Username already exists' });
        }

        if (existingEmail) {
            return res.json({ error: true, message: 'Email already exists' });
        }
        const hash = uuid();
        const hashPassword = bcrypt.hashSync(password, 10)

        const user = new User({ username, email, password: hashPassword, hash });

        await user.save();
        await mail(email, hash);
        return res.json({
            error: false,
            message: "An activation link has been sent to your email please verify your account",
        });
    } catch (error) {
        return next(error);
    }

};

/**
 * @description promote a user to admin
 */
export const promote = async (req: Request, res: Response, next: any) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true });
        return res.json({ message: 'promoted successfully', user });
    } catch (error) {
        return next(error);
    }
};

export const notify = async (req: Request, res: Response, next: any) => {
    try {
        const { event, message, removeAt } = req.body;
        const createdAt = new Date();
        const notification = await Notification.create({ event, message, createdAt, removeAt });
        const done = await User.updateMany({}, {
            $push: { notifications: notification.id },
            $set: { unreadNotification: true }
        });
        return res.json({ done, message: 'Notified successfully' });
    } catch (error) {
        return next(error);
    }
};

export const conform = async (req: Request, res: Response, next: any) => {
    try {
        const { hash } = req.params;
        const user = await User.findOne({ hash });
        if (!user) {
            return res.send('invalid link').status(403);
        }
        if (hash !== user.hash) {
            return res.send('invalid link').status(401);
        } else {
            user.active = true;
            user.hash = "";
            await user.save();

            return res.send('email has been activated successfully click <a href="https://easyhackctf.com/login">here</a> to login')
        }
    } catch (error) {
        return next(error);
    }
};

export const recoverPassword = async (req: Request, res: Response, next: any) => {
    try {
        const { hash } = req.params;
        const { password } = req.body;
        const user = await User.findOne({ hash });
        if (!user) {
            return res.send('invalid link');
        } else {
            await user.setPassword(password);
            user.hash = "";
            await user.save();

            return res.send('your password has been updated successfully click <a href="https://easyhackctf.com/login">here</a> to login');
        }
    } catch (error) {
        return next(error);
    }
};

export const resend = async (req: Request, res: Response, next: any) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: true, message: "email doesn't exist" }).status(401);
        } else {
            const hash = uuid();
            user.hash = hash;

            await user.save();
            await mail(email, hash);
            return res.json({ error: false, message: 'The activation Link has been sent.' });
        }
    } catch (error) {
        return next(error);
    }
};

export const resendUsername = async (req: Request, res: Response, next: any) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ error: true, message: "user doesn't exist" }).status(401);
        } else {
            const hash = uuid();
            user.hash = hash;

            await user.save();
            await mail(user.email, hash);
            return res.json({ error: false, message: 'The activation Link has been sent.' });
        }
    } catch (error) {
        return next(error);
    }
};

export const getNotification = async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ _id: id }, { password: 0 })
            .populate({ path: 'notifications', model: 'Notification' });
        return res.json({ notifications: user.notifications, unread: user.unreadNotification });
    } catch (error) {
        return next(error);
    }
};

export const readNotification = async (req: Request, res: Response, next: any) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { unreadNotification: false });
        res.json({
            error: false,
            message: 'updated successfully',
        });
    } catch (error) {
        return next(error);
    }
};

export const recoverPasswordTemplate = async (req: Request, res: Response, next: any) => {
    try {
        const { hash } = req.params;
        const user = await User.findOne({ hash });
        if (!user) {
            return res.status(403);
        }
        return res.render('recover_password');
    } catch (error) {
        return next(error);
    }
}

export const sendRecorverPassword = async (req: Request, res: Response, next: any) => {
    try {
        const email = req.body.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                error: true,
                message: 'User not found'
            });
        }

        const hash = uuid();
        user.hash = hash;

        await user.save();

        await recoverUserPassword(email, hash);

        res.send({
            error: false,
            message: 'Recovery link has been sent to your email successfully'
        })


    } catch (error) {
        return next(error);
    }
}