import { pool } from '../config/db.js';

export const getAllBookings = async (_req, res) => {
  const [rows] = await pool.query('SELECT b.*, u.name as user_name, e.title as event_title FROM bookings b JOIN users u ON b.user_id=u.id JOIN events e ON b.event_id=e.id ORDER BY b.booking_date DESC');
  res.json(rows);
};

export const getStats = async (_req, res) => {
  const [[users]] = await pool.query('SELECT COUNT(*) as totalUsers FROM users');
  const [[events]] = await pool.query('SELECT COUNT(*) as totalEvents FROM events');
  const [[bookings]] = await pool.query('SELECT COUNT(*) as totalBookings FROM bookings');
  const [[revenue]] = await pool.query("SELECT COALESCE(SUM(total_amount),0) as revenue FROM bookings WHERE status='confirmed'");
  res.json({ ...users, ...events, ...bookings, ...revenue });
};
