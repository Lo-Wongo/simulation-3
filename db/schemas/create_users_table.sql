CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  birthday DATE,
  hair_color TEXT,
  gender TEXT,
  first_name TEXT,
  eye_color TEXT,
  hobby TEXT,
  img TEXT,
  last_name TEXT,
  auth_id text
);