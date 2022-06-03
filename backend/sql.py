CreateTables = '''
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    username VARCHAR ,
    email VARCHAR,
    phone_number CHAR(10),
    bio VARCHAR,
    password_hash VARCHAR,
    password_salt VARCHAR
);

CREATE TABLE IF NOT EXISTS codes (
    code_id UUID PRIMARY KEY,
    code_hash VARCHAR,
    code_salt VARCHAR,
    user_id UUID,
    expiry INTEGER,
    code_type VARCHAR,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
'''

DeleteTables = '''
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS codes;
'''

GetUser = '''
SELECT * FROM users where user_id = ?
'''

CreateUser = '''
INSERT INTO users (user_id, username, email, phone_number, password_hash, password_salt) 
VALUES (?, ?, ?, ?, ?, ?);
'''

CheckCredentials = '''
SELECT EXISTS (
    SELECT * FROM users WHERE username = ? AND password_hash = ?
);
'''

AddCode = '''
INSERT INTO codes (code_id, code_hash, code_salt, user_id, expiry, code_type)
VALUES (?, ?, ?, ?, ?, ?);
'''

ValidateCode = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ? AND code_hash = ? AND  expiry > ?
);
'''

GetSaltByUsername = '''
SELECT password_salt FROM users WHERE username = ?;
'''

GetUserIdAndSaltByEmail = '''
SELECT u.user_id, c.code_salt, c.code_id
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.email = ?;
'''

GetUserIdAndSaltByNumber = '''
SELECT u.user_id, c.code_salt, c.code_id
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.phone_number = ?;
'''

GetUserIdFromEmail = '''
SELECT user_id FROM users WHERE email = ?;
'''

GetUserIdFromNumber = '''
SELECT user_id FROM users WHERE phone_number = ?;
'''

GetUserId = '''
SELECT user_id FROM users WHERE username = ? AND password_hash = ?
'''

RemoveResetCode = '''
DELETE FROM codes WHERE code_id = ?;
'''

RemoveVerifyCode = '''
DELETE FROM codes WHERE user_id = ? AND code_type = 'verify' AND expiry < strftime('%s');
'''

SetPassword = '''
UPDATE users
SET password_hash = ?, password_salt = ?
WHERE user_id = ?;
'''

UserEmailExists = '''
SELECT count(*) FROM users WHERE email = ?;
'''

UserNumberExists = '''
SELECT count(*) FROM users WHERE phone_number = ?;
'''

UsernameExists = '''
SELECT count(*) FROM users WHERE username = ?;
'''

VerifyCodeExists = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ?
);
'''

RemoveUser = '''
DELETE FROM users WHERE user_id = ?;
'''

UpdateUser = '''
    UPDATE users
    SET username = ?, email = ?, phone_number = ?, bio = ?
    WHERE user_id = ?;
'''