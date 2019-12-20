import { Router, Request, Response } from 'express';
import usersRoutes from './users';
import ctfRoutes from './ctf';
import challengeRoutes from './challenges';
import writeupRoutes from './writeups';
import { join } from 'path';

const router = Router();
router.use('/users', usersRoutes);
router.use('/ctf', ctfRoutes);
router.use('/challenges', challengeRoutes);
router.use('/writeups', writeupRoutes);

router.get('/doc', (req: Request, res: Response) => {
    return res.sendFile('index.html', { root: join(__dirname, '../../static') });
});
export default router;
