import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Provide valid name, email and password (min 6 chars).' });
    }
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) return res.status(409).json({ message: 'Email already registered.' });
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name, email, hashed]);
    res.status(201).json({ message: 'Registered successfully' });
  } catch {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, role: user.role, name: user.name, email: user.email });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const me = async (req, res) => {
  const [rows] = await pool.query('SELECT id,name,email,role,created_at FROM users WHERE id = ?', [req.user.id]);
  res.json(rows[0]);
};
