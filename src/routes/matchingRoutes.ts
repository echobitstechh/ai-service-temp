
import { Router } from 'express';
import { matchMentors } from '../controllers/matchingController';

const router = Router();

router.post('/match', matchMentors);

export default router;
