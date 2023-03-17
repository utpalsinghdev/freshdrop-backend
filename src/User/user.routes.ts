import express from 'express';
import { GetProfileController, updateDetailsController } from './user.controller';
import { verifyToken } from '../utils/verifyToken';
const router = express.Router();




router.get('/profile', verifyToken, GetProfileController)
router.post('/profile', verifyToken, updateDetailsController)



export default router;