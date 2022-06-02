CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY,
  username VARCHAR ,
  email VARCHAR,
  phone_number CHAR(10),
  password_hash VARCHAR,
  password_salt VARCHAR
);

CREATE TABLE IF NOT EXISTS codes (
  code_id UUID PRIMARY KEY,
  code_hash VARCHAR,
  user_id UUID,
  expiry INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);