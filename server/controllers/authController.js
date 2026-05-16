import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name, email, hashed]);
  res.status(201).json({ message: 'Registered' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken({ id: user.id, role: user.role, name: user.name, email: user.email });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const me = async (req, res) => {
  const [rows] = await pool.query('SELECT id,name,email,role,created_at FROM users WHERE id = ?', [req.user.id]);
  res.json(rows[0]);
};
