AddCode = '''
INSERT INTO codes (code_id, code_hash, code_salt, user_id, expiry, code_type)
VALUES (?, ?, ?, ?, ?, ?);
'''

RemoveAuthCode = '''
DELETE FROM codes WHERE code_id = ?;
'''

RemoveExpiredCode = '''
DELETE FROM codes WHERE user_id = ? AND code_type = ? AND expiry < strftime('%s');
'''

ValidateCode = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ? AND code_hash = ? AND  expiry > ? AND code_type = ?
);
'''

VerifyCodeExists = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ? AND code_type = 'verify' AND expiry < strftime('%s')
);
'''