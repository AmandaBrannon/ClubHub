-- Users table 
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rank INT,
  created_at DATE DEFAULT CURRENT_DATE
);

-- Clubs table
CREATE TABLE clubs(
  club_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id INT REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Club Memberships with ON DELETE CASCADE
CREATE TABLE club_members(
  membership_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  club_id INT REFERENCES clubs(club_id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table with ON DELETE CASCADE
CREATE TABLE events(
  event_id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  location VARCHAR(255) NOT NULL,
  club_id INT REFERENCES clubs(club_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
