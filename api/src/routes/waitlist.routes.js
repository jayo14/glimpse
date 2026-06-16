import express from 'express';
import { addToWaitlist } from '../controllers/waitlist.controller.js';

const router = express.Router();

router.post('/', addToWaitlist);

export default router;
