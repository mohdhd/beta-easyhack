import { Request, Response } from "express";
import _ from 'lodash';
import { CTF } from '../models/ctf.model';

export class CTFController {

    public static create = async (req: Request, res: Response) => {
        const body = req.body;
        const fields = _.pick(body, ['version', 'about', 'startDate', 'finishDate']);
        try {
            const exsistedCtf = await CTF.findOne(fields);
            if (exsistedCtf) {
                return res.status(409).json({ message: "Already exsisted"});
            }
            const ctf = await CTF.create(fields);
            return res.json({ ctf }).status(201);
        } catch (error) {
            return res.json({ error }).status(500);
        }

    }

    /**
     * @description findAll gets all the ctfs in the DB
     */
    public static findAll = async (req: Request, res: Response) => {
        try {
            const ctfs = await CTF.find();
            return res.json({ ctfs });
        } catch (error) {
            return res.json({ error }).status(500);
        }
    }

    /**
     * @description findOne gets a single ctf by its id
     */
    public static findOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const ctf = await CTF.findOne({ _id: id });
            return res.json({ ctf });
        } catch (error) {
            return res.json({ error }).status(500);
        }
    }

    /**
     * @description updateOne updates an authenticated user by its id
     * the id is not required in this fucntion but it's used only for
     * code consistensy
     */
    public static updateOne = async (req: Request, res: Response) => {
        const body = req.body;
        const user = req.user;
        const updatedFields = _.pick(body,
            ['version', 'startDate', 'finishDate', 'about',]);
        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const doc = await CTF.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
            return res.json({ message: "updated successfuly", ctf: doc });
        } catch (error) {
            return res.json({ error }).status(500);
        }
    }

    /**
     * @description deleteOne deletes an authenticated user by its id
     * the id is not required in this fucntion but it's used only for
     * code consistensy
     */
    public static deleteOne = async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const ctf = await CTF.findByIdAndDelete(user.id);
            return res.json({ message: "deleted successfuly", ctf });
        } catch (error) {
            return res.json({ error }).status(500);
        }
    }

}
