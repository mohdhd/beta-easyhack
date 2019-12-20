import { Router } from 'express';
import passport from "passport";
import { ChallengeController, findChallenge } from '../controllers/challenges';
import { upload } from '../config/multer';
import { isAdmin } from '../middlewares/permissions';

const router = Router();

/**
 * @api {get} /challenges List all challenges
 * @apiGroup Challenges
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission admin
 * @apiSuccess {Object[]} challenge list
 * @apiSuccess {String} challenge._id Challenge id
 * @apiSuccess {String} challenge.author Author id
 * @apiSuccess {String} challenge.title Challenge title
 * @apiSuccess {String} challenge.difficulty Challenge difficulty
 * @apiSuccess {String} challenge.category Challenge category
 * @apiSuccess {String} challenge.file Challenge file
 * @apiSuccess {Number} challenge.score Challenge score
 * @apiSuccess {Number} challenge.submissions Challenge submissions
 * @apiSuccess {Number} challenge.solves Challenge solves
 * @apiSampleRequest http://localhost:8000/api/challenges/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "challenges": [
 *        {
 *          "solves": 0,
 *          "submissions": 0,
 *          "_id": "5d3ed1b97b7f06737c15d5b3",
 *          "title": "Anarchism",
 *          "author": "5d3ec57e33155b5c551fdb6e",
 *          "score": 100,
 *          "difficulty": "Easy",
 *          "category": "RE",
 *          "file": "/static/challenge_files/1564398009677iPad_low_vision.jpg",
 *          "__v": 0
 *        }
 *      ]
 *    }
 * @apiUse InternalServerError
 */
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, ChallengeController.findAll);

/**
 * @api {get} /challenges/available List available challenges
 * @apiGroup Challenges
 * @apiSuccess {Object[]} challenge list
 * @apiSuccess {String} challenge._id Challenge id
 * @apiSuccess {String} challenge.author Author id
 * @apiSuccess {String} challenge.title Challenge title
 * @apiSuccess {String} challenge.difficulty Challenge difficulty
 * @apiSuccess {String} challenge.category Challenge category
 * @apiSuccess {String} challenge.file Challenge file
 * @apiSuccess {Number} challenge.score Challenge score
 * @apiSuccess {Number} challenge.submissions Challenge submissions
 * @apiSuccess {Number} challenge.solves Challenge solves
 * @apiSampleRequest http://localhost:8000/api/challenges/available/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "challenges": [
 *        {
 *          "solves": 0,
 *          "submissions": 0,
 *          "_id": "5d3ed1b97b7f06737c15d5b3",
 *          "title": "Anarchism",
 *          "author": "5d3ec57e33155b5c551fdb6e",
 *          "score": 100,
 *          "difficulty": "Easy",
 *          "category": "RE",
 *          "file": "/static/challenge_files/1564398009677iPad_low_vision.jpg",
 *          "__v": 0
 *        }
 *      ]
 *    }
 * @apiUse InternalServerError
 */
router.get('/available', ChallengeController.findAvailable);

/**
 * @api {post} /challenges Create a new challenge.
 * @apiGroup Challenges
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission admin
 * @apiParam {String} author Challenge author id.
 * @apiParam {String} category Challenge Category.
 * @apiParam {String} details Challenge details.
 * @apiParam {String} difficulty Challenge difficulty ["Easy", "Medium", "Hard"].
 * @apiParam {File} file Challenge file.
 * @apiParam {String} flag Challenge flag.
 * @apiParam {Number} score Challenge score.
 * @apiParam {String} title Challenge title.
 * @apiParamExample {json} Input
 *    {
 *      "author": "5d3ec57e33155b5c551fdb6e",
 *      "category": "RE",
 *      "details": "Challenge description",
 *      "difficulty": "Easy",
 *      "flag": "THIS IS A FLAG",
 *      "score": 100,
 *      "title": "Challenge 101"
 *    }
 * @apiSuccess {Object} challenge Created challenge.
 * @apiSuccess {String} challenge._id Challenge id
 * @apiSuccess {String} challenge.author Author id
 * @apiSuccess {String} challenge.title Challenge title
 * @apiSuccess {String} challenge.difficulty Challenge difficulty
 * @apiSuccess {String} challenge.category Challenge category
 * @apiSuccess {File} challenge.file Challenge file
 * @apiSuccess {Number} challenge.score Challenge score
 * @apiSuccess {Number} challenge.submissions Challenge submissions
 * @apiSuccess {Number} challenge.solves Challenge solves
 * @apiSampleRequest http://localhost:8000/api/challenges/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "solves": 0,
 *      "submissions": 0,
 *      "_id": "5d3ed1b97b7f06737c15d5b3",
 *      "title": "Anarchism",
 *      "author": "5d3ec57e33155b5c551fdb6e",
 *      "score": 100,
 *      "difficulty": "Easy",
 *      "category": "RE",
 *      "file": "/static/challenge_files/1564398009677iPad_low_vision.jpg",
 *      "__v": 0
 *    }
 * @apiUse InternalServerError
 */
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin,
  upload.single('file'), ChallengeController.addOne);

/**
 * @api {get} /challenges/archived List archived challenges
 * @apiGroup Challenges
 * @apiSuccess {Object[]} challenge list
 * @apiSuccess {String} challenge._id Challenge id
 * @apiSuccess {String} challenge.author Author id
 * @apiSuccess {String} challenge.title Challenge title
 * @apiSuccess {String} challenge.difficulty Challenge difficulty
 * @apiSuccess {String} challenge.category Challenge category
 * @apiSuccess {String} challenge.file Challenge file
 * @apiSuccess {Number} challenge.score Challenge score
 * @apiSuccess {Number} challenge.submissions Challenge submissions
 * @apiSuccess {Number} challenge.solves Challenge solves
 * @apiSampleRequest http://localhost:8000/api/challenges/archived
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "challenges": [
 *        {
 *            "solves": 0,
 *            "submissions": 0,
 *            "_id": "5d3ed1b97b7f06737c15d5b3",
 *            "title": "Anarchism",
 *            "author": "5d3ec57e33155b5c551fdb6e",
 *            "score": 100,
 *            "difficulty": "Easy",
 *            "category": "RE",
 *            "file": "/static/challenge_files/1564398009677iPad_low_vision.jpg",
 *            "__v": 0
 *        },
 *      ],
 *    }
 * @apiUse InternalServerError
 */
router.get('/archived', ChallengeController.findArchived);

/**
 * @api {get} /challenges/:id Get a single challenge
 * @apiGroup Challenges
 * @apiSuccess {Object} challenge Challenge object
 * @apiSuccess {String} challenge._id Challenge id
 * @apiSuccess {String} challenge.author Author id
 * @apiSuccess {String} challenge.title Challenge title
 * @apiSuccess {String} challenge.difficulty Challenge difficulty
 * @apiSuccess {String} challenge.category Challenge category
 * @apiSuccess {String} challenge.file Challenge file
 * @apiSuccess {Number} challenge.score Challenge score
 * @apiSuccess {Number} challenge.submissions Challenge submissions
 * @apiSuccess {Number} challenge.solves Challenge solves
 * @apiSampleRequest http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "solves": 0,
 *      "submissions": 0,
 *      "_id": "5d3ed1b97b7f06737c15d5b3",
 *      "title": "Anarchism",
 *      "author": "5d3ec57e33155b5c551fdb6e",
 *      "score": 100,
 *      "difficulty": "Easy",
 *      "category": "RE",
 *      "file": "/static/challenge_files/1564398009677iPad_low_vision.jpg",
 *      "__v": 0
 *    },
 * @apiError {String} message
 * @apiErrorExample {json} Challenge not found
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Challenge not found"
 *  }
 * @apiUse InternalServerError
 */
router.get('/:id', ChallengeController.findOne);

/**
 * @api {put} /challenges Update challenge.
 * @apiGroup Challenges
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission admin
 * @apiParam {String} author Challenge author.
 * @apiParam {String} category Challenge Category.
 * @apiParam {String} details Challenge details.
 * @apiParam {String} difficulty Challenge difficulty.
 * @apiParam {File} file Challenge file.
 * @apiParam {String} flag Challenge flag.
 * @apiParam {Number} score Challenge score.
 * @apiParam {String} title Challenge title.
 * @apiParamExample {json} Input
 *    {
 *      "author": "5d3ec57e33155b5c551fdb6e",
 *      "category": "RE",
 *      "details": "Challenge description",
 *      "difficulty": "Easy",
 *      "flag": "THIS IS A FLAG",
 *      "score": 100,
 *      "title": "Challenge 101"
 *    }
 * @apiSuccess {Object} challenge Created challenge.
 * @apiSuccess {String} challenge._id Challenge id
 * @apiSuccess {String} challenge.author Author id
 * @apiSuccess {String} challenge.title Challenge title
 * @apiSuccess {String} challenge.difficulty Challenge difficulty
 * @apiSuccess {String} challenge.category Challenge category
 * @apiSuccess {File} challenge.file Challenge file
 * @apiSuccess {Number} challenge.score Challenge score
 * @apiSuccess {Number} challenge.submissions Challenge submissions
 * @apiSuccess {Number} challenge.solves Challenge solves
 * @apiSampleRequest http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "updated successfully",
 *      "challenge": {
 *        "solves": 0,
 *        "submissions": 0,
 *        "_id": "5d3ed1b97b7f06737c15d5b3",
 *        "title": "Anarchism",
 *        "author": "5d3ec57e33155b5c551fdb6e",
 *        "score": 100,
 *        "difficulty": "Easy",
 *        "category": "RE",
 *        "file": "/static/challenge_files/1564398009677iPad_low_vision.jpg",
 *        "__v": 0
 *      }
 *    }
 * @apiError {String} message
 * @apiErrorExample {json} Challenge not found
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Challenge not found"
 *  }
 * @apiErrorExample {json} No field edited
 *  HTTP/1.1 411 Length Required
 *  {
 *    "message": "Please edit at least one field"
 *  }
 * @apiUse InternalServerError
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin,
  upload.single('file'), ChallengeController.updateOne);

/**
 * @api {delete} /challenges/:id Delete a challenge
 * @apiGroup Challenges
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission admin
 * @apiSuccess {String} message
 * @apiSampleRequest http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Deleted successfully"
 *    }
 * @apiError {String} message
 * @apiErrorExample {json} Challenge not found
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Challenge not found"
 *  }
 * @apiUse InternalServerError
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin,
  ChallengeController.deleteOne);

/**
 * @api {post} /challenges/:id Submit a challenge solution.
 * @apiGroup Challenges
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission user
 * @apiParam {String} flag The challenge's flag.
 * @apiParamExample {json} Input
 *  {
 *    "flag": "fl4g_0f_ch4ll3ng3"
 *  }
 * @apiSuccess {String} message
 * @apiSampleRequest http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *    "message": "The flag is correct!"
 *  }
 * @apiError {String} message
 * @apiErrorExample {json} Challenge solved
 *  HTTP/1.1 409 Conflict
 *  {
 *    "message": "Challenge already solved."
 *  }
 * @apiErrorExample {json} Flag not correct
 *  HTTP/1.1 417 Expectation Failed
 *  {
 *    "message": "The flag is not correct."
 *  }
 * @apiUse InternalServerError
 */
router.post('/:id', passport.authenticate('jwt', { session: false }), ChallengeController.submit);
export default router;

router.get('/admin/:id', passport.authenticate("jwt", { session: false }), isAdmin, findChallenge);

//get challenges by category
router.get('/category/:cat', ChallengeController.findByCategory);
/**
 * @apiDefine InternalServerError
 *
 * @apiError {String} error Details of the error.
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "error": "Error details"
 *  }
 */
