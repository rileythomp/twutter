UPDATE users
SET password_hash = ?, password_salt = ?
WHERE user_id = ?;