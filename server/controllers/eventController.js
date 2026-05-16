import { pool } from '../config/db.js';

export const getEvents = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM events WHERE date >= NOW() ORDER BY date ASC');
  res.json(rows);
};
export const getEventById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM events WHERE id=?', [req.params.id]);
  res.json(rows[0]);
};
export const createEvent = async (req, res) => {
  const { title, description, location, date, total_seats, price, image } = req.body;
  await pool.query('INSERT INTO events (title,description,location,date,total_seats,available_seats,price,image) VALUES (?,?,?,?,?,?,?,?)', [title, description, location, date, total_seats, total_seats, price, image]);
  res.status(201).json({ message: 'Event created' });
};
export const updateEvent = async (req, res) => {
  const { title, description, location, date, total_seats, available_seats, price, image } = req.body;
  await pool.query('UPDATE events SET title=?,description=?,location=?,date=?,total_seats=?,available_seats=?,price=?,image=? WHERE id=?', [title, description, location, date, total_seats, available_seats, price, image, req.params.id]);
  res.json({ message: 'Event updated' });
};
export const deleteEvent = async (req, res) => {
  await pool.query('DELETE FROM events WHERE id=?', [req.params.id]);
  res.json({ message: 'Event deleted' });
};
