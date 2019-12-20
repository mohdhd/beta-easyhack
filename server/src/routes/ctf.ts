import { Router } from 'express';
import passport from "passport";
import { CTFController } from '../controllers/ctf';
import { ctfValidator, updateCtf } from '../middlewares/validators';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

/**
 * @api {get} /ctf List all CTFs
 * @apiGroup CTF
 * @apiSuccess {Object[]} ctf list
 * @apiSuccess {String} ctf._id ctf id
 * @apiSuccess {String} ctf.version ctf version number
 * @apiSuccess {String} ctf.about ctf's about
 * @apiSuccess {String} ctf.startDate ctf's startDate
 * @apiSuccess {String} ctf.finishDate ctf's finishDate
 * @apiSampleRequest http://localhost:8000/api/ctf/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": 564643,
 *      "version": "1.0.0",
 *      "type": "ctf",
 *      "startDate": "2019-8-20",
 *      "finishDate": "2019-8-25"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/', CTFController.findAll);

/**
 * @api {get} /ctf Get a single ctf
 * @apiGroup CTF
 * @apiSuccess {String} ctf._id ctf id
 * @apiSuccess {String} ctf.version ctf version number
 * @apiSuccess {String} ctf.about ctf's about
 * @apiSuccess {String} ctf.startDate ctf's startDate
 * @apiSuccess {String} ctf.finishDate ctf's finishDate
 * @apiSampleRequest http://localhost:8000/api/ctf/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": 564643,
 *      "version": "1.0.0",
 *      "type": "ctf",
 *      "startDate": "2019-8-20",
 *      "finishDate": "2019-8-25"
 *    }
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 404 Not found
 */
router.get('/:id', CTFController.findOne);

/**
 * @api {put} /ctf updates a single ctf only Admins
 * @apiGroup CTF
 * @apiParam {String} version CTF version
 * @apiParam {String} about CTF description
 * @apiParam {Date} startDate CTF startDate
 * @apiParam {Date} finishDate CTF finishDate
 * @apiSuccess {String} ctf._id ctf id
 * @apiSuccess {String} ctf.version ctf version number
 * @apiSuccess {String} ctf.about ctf's about
 * @apiSuccess {String} ctf.startDate ctf's startDate
 * @apiSuccess {String} ctf.finishDate ctf's finishDate
 * @apiSampleRequest http://localhost:8000/api/ctf/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": 564643,
 *      "version": "1.0.0",
 *      "type": "ctf",
 *      "startDate": "2019-8-20",
 *      "finishDate": "2019-8-25"
 *    }
 * @apiErrorExample {json} Auth error
 *    HTTP/1.1 403 Forbidden
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 404 Not found
 */
router.put('/:id', updateCtf,
    passport.authenticate('jwt', { session: false }), isAdmin, CTFController.updateOne);
/**
 * @api {delete} /ctf Deletes a single ctf
 * @apiGroup CTF
 * @apiSuccess {String} ctf._id ctf id
 * @apiSuccess {String} ctf.version ctf version number
 * @apiSuccess {String} ctf.about ctf's about
 * @apiSuccess {String} ctf.startDate ctf's startDate
 * @apiSuccess {String} ctf.finishDate ctf's finishDate
 * @apiSampleRequest http://localhost:8000/api/ctf/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": 564643,
 *      "version": "1.0.0",
 *      "type": "ctf",
 *      "startDate": "2019-8-20",
 *      "finishDate": "2019-8-25"
 *    }
 * @apiErrorExample {json} Auth error
 *    HTTP/1.1 403 Forbidden
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin,
    CTFController.deleteOne);

export default router;
