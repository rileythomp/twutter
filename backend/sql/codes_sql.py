AddCode = '''
INSERT INTO codes (code_id, code_hash, code_salt, user_id, expiry, code_type)
VALUES (?, ?, ?, ?, ?, ?);
'''

RemoveResetCode = '''
DELETE FROM codes WHERE code_id = ?;
'''

RemoveVerifyCode = '''
DELETE FROM codes WHERE user_id = ? AND code_type = 'verify' AND expiry < strftime('%s');
'''

ValidateCode = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ? AND code_hash = ? AND  expiry > ?
);
'''

VerifyCodeExists = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ?
);
'''