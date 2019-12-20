import { Router } from 'express';
import passport from "passport";
import {
    notify, conform, recoverPassword,
    findAll, findOne, deleteOne,
    findSolvedChallenges, login,
    promote, signup, updateOne, getNotification, readNotification, resend, resendUsername, recoverPasswordTemplate,sendRecorverPassword
} from '../controllers/users';
import {
    usernamePassword,
    updateUser,
    userSignup,
} from '../middlewares/validators';
import { isAdmin } from '../middlewares/permissions';

const router = Router();

router.get('/', findAll);

router.post('/login', usernamePassword, login);

router.post('/signup', signup);

router.get('/:id', findOne);

router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser, updateOne);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteOne);

router.post('/:id/promote', passport.authenticate('jwt', { session: false }),
    isAdmin, promote);

router.post('/notify', passport.authenticate('jwt', { session: false }),
    isAdmin, notify);

router.get('/notifications/:id', passport.authenticate('jwt', { session: false }), getNotification)

router.get('/read/notification', passport.authenticate('jwt', { session: false }), readNotification)

router.get('/confirm/:hash', conform);

// get the user solved challenges
router.get('/solved/:id', findSolvedChallenges);


router.post('/resend_activation', resend);

router.post('/resend_username', resendUsername);

router.post('/recover_password/:hash', recoverPassword);

router.get('/recover_password/:hash', recoverPasswordTemplate);

router.post('/send_password_recovery',sendRecorverPassword)

export default router;
