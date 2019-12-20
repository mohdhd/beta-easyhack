import { Request, Response } from "express";
import { Writeup } from "../models/writeup.model";
import _ from 'lodash';

export class WriteupController {

  /**
   * @description List writeups from the database.
   */
  public static findAll = async (req: Request, res: Response) => {
    try {

      const writeups = await Writeup.find().populate('challenge');
      return res.json({ writeups });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Get one writeup from the database.
   */
  public static findOne = async (req: Request, res: Response) => {
    try {

      const writeup = await Writeup.findById(req.params.id)
        .populate('challenge');

      // If a writeup wasn't found for the specified id.
      if (writeup === null) {
        return res.json({ message: "Writeup not found" }).status(404);
      }

      // If a writeup was found.
      return res.json({ writeup });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Add a new writeup.
   */
  public static addOne = async (req: Request, res: Response) => {
    try {

      const fields = _.pick(req.body, ['author', 'challenge', 'content']);
      const writeup = await Writeup.create(fields);
      return res.json({ writeup });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Update a writeup.
   */

  public static updateOne = async (req: Request, res: Response) => {
    const body = req.body;
    try {

      const updatedFields = _.pick(body, ['author', 'challenge', 'content']);

      // Make sure at least one field is updated.
      if (_.isEmpty(updatedFields)) {
        return res.json({ message: "Please edit at least one field" }).status(411);
      }

      const writeup = await Writeup.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true });

      // If a writeup wasn't found for the specified id.
      if (writeup === null) {
        return res.json({ message: "Writeup not found" }).status(404);
      }

      // If a writeup was found.
      return res.json({ writeup, message: "updated successfully" });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Delete a writeup.
   */
  public static deleteOne = async (req: Request, res: Response) => {
    try {

      const writeup = await Writeup.findByIdAndDelete(req.params.id);

      // If a writeup wasn't found for the specified id.
      if (writeup === null) {
        return res.json({ message: "Writeup not found" }).status(404);
      }

      // If a writeup was found.
      return res.json({ message: "Deleted succesfully" });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }
}
