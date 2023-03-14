import express from 'express';
import { generateOtpController, verifyOtpController } from './otp.controller';

const router = express.Router();

router.post('/generate-otp', generateOtpController);
router.post('/auth/verify', verifyOtpController);

export default router;
