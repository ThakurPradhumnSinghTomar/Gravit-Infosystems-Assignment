import { Router } from 'express';
import { cancelBooking, createBooking, myBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/', protect, createBooking);
router.get('/my', protect, myBookings);
router.put('/:id/cancel', protect, cancelBooking);
export default router;
