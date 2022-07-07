AddUser = '''
INSERT INTO users (user_id, username, email, phone_number, is_public, password_hash, password_salt) 
VALUES (?, ?, ?, ?, ?, ?, ?);
'''

RemoveUser = '''
DELETE FROM users WHERE user_id = ?;
'''

UpdateUser = '''
UPDATE users
SET username = ?, email = ?, phone_number = ?, bio = ?, is_public = ?
WHERE user_id = ?;
'''

SetPassword = '''
UPDATE users
SET password_hash = ?, password_salt = ?
WHERE user_id = ?;
'''

GetUser = '''
SELECT * FROM users where user_id = ?;
'''

GetUserId = '''
SELECT user_id FROM users WHERE username = ? AND password_hash = ?;
'''

GetUserIdFromName = '''
SELECT user_id FROM users WHERE username = ?;
'''

GetUserIdFromNumber = '''
SELECT user_id FROM users WHERE phone_number = ?;
'''

GetUserIdFromEmail = '''
SELECT user_id FROM users WHERE email = ?;
'''

GetUserIdAndCodeByNumber = '''
SELECT u.user_id, c.code_salt, c.code_id
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.phone_number = ? AND c.code_type = ?;
'''

GetUserIdAndCodeByEmail = '''
SELECT u.user_id, c.code_salt, c.code_id
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.email = ? AND c.code_type = ?;
'''

GetSaltByUsername = '''
SELECT password_salt FROM users WHERE username = ?;
'''

UserIsPublic = '''
SELECT is_public = 1 FROM users WHERE username = ?;
'''

UsernameExists = '''
SELECT COUNT(*) FROM users WHERE username = ?;
'''

UsernameInUse = '''
SELECT COUNT(*) FROM users WHERE username = ? AND user_id != ?;
'''

UserEmailExists = '''
SELECT COUNT(*) FROM users WHERE email = ?;
'''

UserEmailInUse = '''
SELECT COUNT(*) FROM users WHERE email = ? AND user_id != ?;
'''

UserNumberExists = '''
SELECT COUNT(*) FROM users WHERE phone_number = ?;
'''

UserPhoneInUse = '''
SELECT COUNT(*) FROM users WHERE phone_number = ? AND user_id != ?;
'''

CheckCredentials = '''
SELECT EXISTS (
    SELECT * FROM users WHERE username = ? AND password_hash = ?
);
'''

StartSearchUsers = '''
SELECT * FROM users WHERE is_public = 1 AND username LIKE ?||'%' LIMIT 10;
'''

NotStartSearchUsers = '''
SELECT * FROM users WHERE is_public = 1 AND username NOT LIKE $1||'%' AND username LIKE '%'||$1||'%' LIMIT 10;
'''