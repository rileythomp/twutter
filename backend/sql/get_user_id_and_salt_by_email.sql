SELECT u.user_id, c.code_salt
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.email = ?;