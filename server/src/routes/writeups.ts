import { Router } from "express";
import passport from "passport";
import { WriteupController } from "../controllers/writeups";
import { isAuthorOrAdmin } from "../middlewares/permissions";

const router = Router();

/**
 * @api {get} /writeups List all writeups
 * @apiGroup Writeups
 * @apiSuccess {Object} writeup Created writeup.
 * @apiSuccess {String} writeup._id Writeup id.
 * @apiSuccess {Object} writeup.challenge Created challenge.
 * @apiSuccess {String} writeup.challenge._id Challenge id
 * @apiSuccess {String} writeup.challenge.author Author id
 * @apiSuccess {String} writeup.challenge.title Challenge title
 * @apiSuccess {String} writeup.challenge.difficulty Challenge difficulty
 * @apiSuccess {String} writeup.challenge.category Challenge category
 * @apiSuccess {File} writeup.challenge.file Challenge file
 * @apiSuccess {Number} writeup.challenge.score Challenge score
 * @apiSuccess {Number} writeup.challenge.submissions Challenge submissions
 * @apiSuccess {Number} writeup.challenge.solves Challenge solves
 * @apiSuccess {String} writeup.content Writeup content
 * @apiSampleRequest http://localhost:8000/api/writeups/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "writeups": [
 *        {
 *          "_id": "5d3ca1ed1ac0025b69a41be0",
 *          "challenge": {
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
 *          },
 *          "content": "WRITEUP CONTENT",
 *          "__v": 0
 *        }
 *      ]
 *    }
 * @apiUse InternalServerError
 */
router.get('/', WriteupController.findAll);

/**
 * @api {post} /writeups Create a new writeup.
 * @apiGroup Writeups
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission user
 * @apiParam {String} author Writup author id.
 * @apiParam {String} challenge Writeup challenge id.
 * @apiParam {String} content Writeup content.
 * @apiParamExample {json} Input
 *    {
 *      "author": "5d3ec57e33155b5c551fdb6e",
 *      "challenge": "5d3c9ee20b3e7b55cdb8b4bb",
 *      "content": "WRITEUP CONTENT"
 *    }
 * @apiSuccess {Object} writeup Created writeup.
 * @apiSuccess {String} writeup._id Writeup id.
 * @apiSuccess {Object} writeup.challenge Created challenge.
 * @apiSuccess {String} writeup.challenge._id Challenge id
 * @apiSuccess {String} writeup.challenge.author Author id
 * @apiSuccess {String} writeup.challenge.title Challenge title
 * @apiSuccess {String} writeup.challenge.difficulty Challenge difficulty
 * @apiSuccess {String} writeup.challenge.category Challenge category
 * @apiSuccess {File} writeup.challenge.file Challenge file
 * @apiSuccess {Number} writeup.challenge.score Challenge score
 * @apiSuccess {Number} writeup.challenge.submissions Challenge submissions
 * @apiSuccess {Number} writeup.challenge.solves Challenge solves
 * @apiSuccess {String} writeup.content Writeup content
 * @apiSampleRequest http://localhost:8000/api/writeups/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "5d3ca1ed1ac0025b69a41be0",
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
 *      },
 *      "content": "WRITEUP CONTENT",
 *      "__v": 0
 *    }
 * @apiUse InternalServerError
 */
router.post('/', passport.authenticate('jwt', { session: false }), WriteupController.addOne);

/**
 * @api {get} /writeups/:id Get a single writeups
 * @apiGroup Writeups
 * @apiSuccess {Object} writeup
 * @apiSuccess {String} writeup._id Writeup id.
 * @apiSuccess {Object} writeup.challenge Created challenge.
 * @apiSuccess {String} writeup.challenge._id Challenge id
 * @apiSuccess {String} writeup.challenge.author Author id
 * @apiSuccess {String} writeup.challenge.title Challenge title
 * @apiSuccess {String} writeup.challenge.difficulty Challenge difficulty
 * @apiSuccess {String} writeup.challenge.category Challenge category
 * @apiSuccess {File} writeup.challenge.file Challenge file
 * @apiSuccess {Number} writeup.challenge.score Challenge score
 * @apiSuccess {Number} writeup.challenge.submissions Challenge submissions
 * @apiSuccess {Number} writeup.challenge.solves Challenge solves
 * @apiSuccess {String} writeup.content Writeup content
 * @apiSampleRequest http://localhost:8000/api/writeups/5d3ca1ed1ac0025b69a41be0
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "5d3ca1ed1ac0025b69a41be0",
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
 *      },
 *      "content": "WRITEUP CONTENT",
 *      "__v": 0
 *    }
 * @apiError {String} message
 * @apiErrorExample {json} Writeup not found
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Writeup not found"
 *  }
 * @apiUse InternalServerError
 */
router.get('/:id', WriteupController.findOne);

/**
 * @api {put} /writeups Update writeup.
 * @apiGroup Writeups
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission user
 * @apiParam {String} author Writup author id.
 * @apiParam {String} challenge Writeup challenge id.
 * @apiParam {String} content Writeup content.
 * @apiParamExample {json} Input
 *    {
 *      "author": "5d3ec57e33155b5c551fdb6e",
 *      "challenge": "5d3c9ee20b3e7b55cdb8b4bb",
 *      "content": "WRITEUP CONTENT"
 *    }
 * @apiSuccess {Object} writeup Updated writeup.
 * @apiSuccess {String} writeup._id Writeup id.
 * @apiSuccess {Object} writeup.challenge Created challenge.
 * @apiSuccess {String} writeup.challenge._id Challenge id
 * @apiSuccess {String} writeup.challenge.author Author id
 * @apiSuccess {String} writeup.challenge.title Challenge title
 * @apiSuccess {String} writeup.challenge.difficulty Challenge difficulty
 * @apiSuccess {String} writeup.challenge.category Challenge category
 * @apiSuccess {File} writeup.challenge.file Challenge file
 * @apiSuccess {Number} writeup.challenge.score Challenge score
 * @apiSuccess {Number} writeup.challenge.submissions Challenge submissions
 * @apiSuccess {Number} writeup.challenge.solves Challenge solves
 * @apiSuccess {String} writeup.content Writeup content
 * @apiSampleRequest http://localhost:8000/api/writeups/5d3ca1ed1ac0025b69a41be0
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "5d3ca1ed1ac0025b69a41be0",
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
 *      },
 *      "content": "WRITEUP CONTENT",
 *      "__v": 0
 *    }
 * @apiError {String} message
 * @apiErrorExample {json} Writeup not found
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Writeup not found"
 *  }
 * @apiErrorExample {json} No field edited
 *  HTTP/1.1 411 Length Required
 *  {
 *    "message": "Please edit at least one field"
 *  }
 * @apiUse InternalServerError
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), isAuthorOrAdmin, WriteupController.updateOne);

/**
 * @api {delete} /writeup/:id Delete a writeup
 * @apiGroup Writeups
 * @apiHeader {String} Authorization=BearerToken The authorization header
 * @apiPermission user
 * @apiSuccess {String} message
 * @apiSampleRequest http://localhost:8000/api/writeups/5d3ca1ed1ac0025b69a41be0
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Deleted successfully"
 *    }
 * @apiError {String} message
 * @apiErrorExample {json} Writeup not found
 *  HTTP/1.1 404 Not Found
 *  {
 *    "message": "Writeup not found"
 *  }
 * @apiUse InternalServerError
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAuthorOrAdmin, WriteupController.deleteOne);

export default router;

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
