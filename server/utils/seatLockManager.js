import { pool } from '../config/db.js';

export const cleanExpiredSeatLocks = async () => {
  await pool.query('DELETE FROM seat_locks WHERE expires_at < NOW()');
};
