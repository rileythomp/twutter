SELECT EXISTS (
  SELECT * FROM users WHERE username = ? AND password_hash = ?
);