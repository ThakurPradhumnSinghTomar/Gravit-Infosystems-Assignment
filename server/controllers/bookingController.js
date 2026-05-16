import { pool } from '../config/db.js';
import { generateQRCode } from '../utils/generateQRCode.js';
import { getIO } from '../config/socket.js';

export const createBooking = async (req, res) => {
  const { event_id, quantity, name, email, mobile } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [[event]] = await conn.query('SELECT * FROM events WHERE id=? FOR UPDATE', [event_id]);
    if (!event || event.available_seats < quantity) throw new Error('Insufficient seats');

    const total = Number(event.price) * Number(quantity);
    const [result] = await conn.query(
      'INSERT INTO bookings (user_id,event_id,name,email,mobile,quantity,total_amount) VALUES (?,?,?,?,?,?,?)',
      [req.user.id, event_id, name, email, mobile, quantity, total]
    );

    const qr_code = await generateQRCode({ bookingId: result.insertId, event: event.title, name, quantity, status: 'confirmed' });
    await conn.query('UPDATE bookings SET qr_code=? WHERE id=?', [qr_code, result.insertId]);
    await conn.query('UPDATE events SET available_seats=available_seats-? WHERE id=?', [quantity, event_id]);
    await conn.commit();
    getIO()?.emit('seatUpdated', { event_id, delta: -quantity });
    res.status(201).json({ bookingId: result.insertId, qr_code });
  } catch (error) {
    await conn.rollback();
    res.status(400).json({ message: error.message });
  } finally {
    conn.release();
  }
};

export const myBookings = async (req, res) => {
  const [rows] = await pool.query('SELECT b.*, e.title, e.date, e.location FROM bookings b JOIN events e ON b.event_id=e.id WHERE b.user_id=? ORDER BY b.booking_date DESC', [req.user.id]);
  res.json(rows);
};

export const cancelBooking = async (req, res) => {
  const id = req.params.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const [[booking]] = await conn.query('SELECT * FROM bookings WHERE id=? AND user_id=? FOR UPDATE', [id, req.user.id]);
  if (!booking || booking.status === 'cancelled') {
    await conn.rollback(); conn.release();
    return res.status(404).json({ message: 'Booking not found' });
  }
  await conn.query("UPDATE bookings SET status='cancelled' WHERE id=?", [id]);
  await conn.query('UPDATE events SET available_seats=available_seats+? WHERE id=?', [booking.quantity, booking.event_id]);
  await conn.commit(); conn.release();
  getIO()?.emit('bookingCancelled', { bookingId: id, event_id: booking.event_id });
  res.json({ message: 'Booking cancelled' });
};
