import { Router } from 'express';
import { getAllBookings, getStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();
router.get('/bookings', protect, adminOnly, getAllBookings);
router.get('/stats', protect, adminOnly, getStats);
export default router;
