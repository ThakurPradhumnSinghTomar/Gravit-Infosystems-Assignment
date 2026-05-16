CREATE DATABASE IF NOT EXISTS event_booking;
USE event_booking;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  date DATETIME,
  total_seats INT,
  available_seats INT,
  price DECIMAL(10,2),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  name VARCHAR(100),
  email VARCHAR(100),
  mobile VARCHAR(20),
  quantity INT,
  total_amount DECIMAL(10,2),
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('confirmed','cancelled') DEFAULT 'confirmed',
  qr_code LONGTEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS seat_locks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  quantity INT,
  expires_at DATETIME,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO events (title,description,location,date,total_seats,available_seats,price,image) VALUES
('Neon Nights Concert','High-energy EDM night with top DJs.','Los Angeles, CA','2026-08-11 19:00:00',500,500,89.00,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),
('FutureStack Tech Summit','Cloud, AI, and DevOps conference.','San Francisco, CA','2026-09-14 09:00:00',800,800,249.00,'https://images.unsplash.com/photo-1540575467063-178a50c2df87'),
('UI/UX Design Workshop','Hands-on product design workshop.','Austin, TX','2026-07-22 10:00:00',120,120,79.00,'https://images.unsplash.com/photo-1517048676732-d65bc937f952'),
('City Marathon Finals','Annual championship run event.','Boston, MA','2026-10-03 06:00:00',1200,1200,39.00,'https://images.unsplash.com/photo-1552674605-db6ffd4facb5'),
('Stand-Up Gala Night','Top comedians in one place.','Chicago, IL','2026-06-28 20:00:00',350,350,59.00,'https://images.unsplash.com/photo-1527224538127-2104bb71c51b'),
('Global Culture Fest','Music, food, and dance from around the world.','New York, NY','2026-09-02 12:00:00',900,900,29.00,'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'),
('Indie Rock Live','Acclaimed indie bands performing live.','Seattle, WA','2026-07-09 18:30:00',420,420,69.00,'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'),
('AI Builders Bootcamp','Practical AI engineering sessions.','Denver, CO','2026-11-19 09:30:00',260,260,199.00,'https://images.unsplash.com/photo-1531482615713-2afd69097998');
