CreateTables = '''
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    phone_number CHAR(10),
    bio VARCHAR,
    password_hash VARCHAR,
    password_salt VARCHAR,
    is_public INTEGER
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