AddCode = '''
INSERT INTO codes (code_id, code_hash, code_salt, user_id, expiry, code_type)
VALUES (%s, %s, %s, %s, %s, %s);
'''

RemoveAuthCode = '''
DELETE FROM codes WHERE code_id = %s AND code_type = %s;
'''

RemoveExpiredCode = '''
DELETE FROM codes WHERE user_id = %s AND code_type = %s AND expiry < strftime('%s');
'''

RemoveUnsentCode = '''
DELETE FROM codes WHERE user_id = %s AND code_hash = %s AND code_salt = %s AND expiry = %s and code_type = %s;
'''

ValidateCode = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = %s AND code_hash = %s AND  expiry > %s AND code_type = %s
);
'''

VerifyCodeExists = '''
SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = %s AND code_type = 'verify' AND expiry < strftime('%s')
);
'''

GetCodeByUserId = '''
SELECT c.code_salt, c.code_id
FROM codes c
INNER JOIN users u
ON u.user_id = c.user_id
WHERE u.user_id = %s AND c.code_type = %s;
'''