import _ from 'lodash';
import { Request, Response } from "express";
import { unlinkSync } from "fs";
import { resolve } from "path";
import { Challenge } from "../models/challenge.model";
import { UserDocument, User } from "../models/user.model";
import { userSignup } from '../middlewares/validators';
import { CTF } from '../models/ctf.model';

export class ChallengeController {

  /**
   * @description List all challenges from the database.
   */
  public static findAll = async (req: Request, res: Response) => {
    try {

      const challenges = await Challenge.find();
      return res.json({ challenges });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description List current challenges from the database.
   */
  public static findAvailable = async (req: Request, res: Response) => {
    try {

      const challenges = await Challenge.find({ live: true, active: true });
      return res.json({ challenges });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description List archived challenges.
   */
  public static findArchived = async (req: Request, res: Response) => {
    try {

      const challenges = await Challenge.find({ archived: true, active: true });
      return res.json({ challenges });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  public static findByCategory = async (req: Request, res: Response) => {
    try {
      let category = req.params.cat

      const challenges = await Challenge.find({ archived: true, active: true,category });
      return res.json({ challenges });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Get one challenge from the database.
   */
  public static findOne = async (req: Request, res: Response) => {
    try {
      const challenge = await Challenge.findById(req.params.id);
      // A challenge wasn't found for the specified id.
      if (challenge === null) {
        return res.json({ message: "Challenge not found" }).status(404);
      }

      // A challenge was found.
      return res.json({ challenge });

    } catch (error) {
      res.json({ error }).status(500);
      console.log(error)
    }
  }

  /**
   * @description Add a new challenge.
   */
  public static addOne = async (req: Request, res: Response) => {
    try {

      const fields = _.pick(req.body, ['active', 'title', 'author',
        'score', 'flag', 'details', 'difficulty', 'category', 'file', 'active', 'live', 'archived']);
      const file = req.file;

      // Get the url for the file if it exists.
      if (file !== undefined) {
        fields.file = file.path.substring(file.path.lastIndexOf('static') - 1);
      }

      const challenge = await Challenge.create(fields);
      return res.json({ challenge });

    } catch (error) {

      // Delete the uploaded file if it exists.
      // tslint:disable-next-line: no-unused-expression
      req.file && unlinkSync(req.file.path);
      return res.json({ error }).status(500);

    }
  }

  /**
   * @description Update a challenge.
   */

  public static updateOne = async (req: Request, res: Response) => {
    const { file, body } = req;
    try {

      const updatedFields = _.pick(body,
        ['active', 'title', 'flag', 'score', 'details',
          'difficulty', 'category',
          'archived', 'file', 'live', 'archived', 'active']);

      // Make sure at least one field is updated.
      if (_.isEmpty(updatedFields) && file === undefined) {
        return res.json({ message: "Please edit at least one field" }).status(411);
      }

      // If the file is updated
      if (file !== undefined) {
        // Get the old file and delete it.
        const { file: oldFile } = await Challenge.findById(req.params.id).select('file');
        unlinkSync(resolve(oldFile.substring(1)));

        // Update the url in the database.
        updatedFields.file = file.path.substring(file.path.lastIndexOf('static') - 1);
      }

      const challenge = await Challenge.findByIdAndUpdate(req.params.id,
        updatedFields, { new: true, runValidators: true });

      // A challenge wasn't found for the specified id.
      if (challenge === null) {
        return res.json({ message: "Challenge not found" }).status(404);
      }

      // A challenge was found.
      return res.json({ challenge, message: "updated successfully" });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Delete a challenge.
   */
  public static deleteOne = async (req: Request, res: Response) => {
    try {

      const challenge = await Challenge.findByIdAndDelete(req.params.id);

      // A challenge wasn't found for the specified id.
      if (challenge === null) {
        return res.json({ message: "Challenge not found" }).status(404);
      }

      // Delete the challenge file.
      unlinkSync(resolve(challenge.file.substring(1)));

      // A challenge was found.
      return res.json({ message: "Deleted successfully" });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }

  /**
   * @description Submit a solution to a challenge.
   */
  public static submit = async (req: Request, res: Response) => {
    const { flag }: { flag: string } = req.body;
    const user: UserDocument = await User.findById(req.user.id);
    try {

      const challenge = await Challenge.findById(req.params.id)
        .select(['flag', 'submissions', 'solves', "score","live","archived"]);

      // Check if the user has already solved the challenge.
      if (user.solvedChallenges.includes(req.params.id)) {
        return res.json({ message: "Challenge is already solved",submissions: challenge.submissions,
        solves: challenge.solves, }).status(409);
      }


      // Increase the number of submissions.
      challenge.submissions += 1;

      // Check if the flag is correct.
      if (flag !== challenge.flag) {
        if (challenge.live) {

          let ctf = await CTF.find()
          
          if(new Date().getTime() > new Date(ctf[0].finishDate).getTime()){
              challenge.submissions -=1;
  
          }
        }
        await challenge.save();
        return res.json({
          message: "Wrong Flag",
          submissions: challenge.submissions,
          solves: challenge.solves,
        }).status(417);
      }

      // The flag is correct, Add one to the solve count.
      challenge.solves += 1;
      await challenge.save();

      // Add the challenge to the user's solved challenges.
      user.solvedChallenges.push(challenge.id);


      // check if it's a live challenge or archived challenge
      if (challenge.live) {

        let ctf = await CTF.find()
        
        if(new Date().getTime() > new Date(ctf[0].finishDate).getTime()){
            challenge.solves -=1;
            challenge.submissions -=1;

            await challenge.save()

            return res.json({
              message: "The competition has ended",
              submissions: challenge.submissions,
              solves: challenge.solves
            });
        }

        user.liveScore += challenge.score;
        user.score += challenge.score;
        user.liveFlagSubmitTime = new Date().getTime();
        user.flagSubmitTime = new Date().getTime();
      } else if (challenge.archived) {

        user.score += challenge.score;
        user.flagSubmitTime = new Date().getTime();
      }

      await user.save();

      return res.json({
        message: "The flag is correct!",
        submissions: challenge.submissions,
        solves: challenge.solves
      });

    } catch (error) {
      return res.json({ error }).status(500);
    }
  }
}

export const findChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await Challenge.findById(req.params.id).select("+flag");
    // A challenge wasn't found for the specified id.
    if (challenge === null) {
      return res.json({ message: "Challenge not found" }).status(404);
    }
    // A challenge was found.
    return res.json({ challenge });

  } catch (error) {
    return res.json({ error }).status(500);
  }
}