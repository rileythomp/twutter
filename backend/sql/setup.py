CreateTables = '''
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    phone_number CHAR(10),
    bio VARCHAR,
    is_public INTEGER,
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

CREATE TABLE IF NOT EXISTS posts (
    post_id UUID PRIMARY KEY,
    user_id UUID,
    post VARCHAR,
    created_at INTEGER,
    updated_at INTEGER,
    is_public INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS likes (
    post_id UUID,
    user_id UUID,
    liked_at INTEGER,
    change INTEGER,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
'''

DeleteTables = '''
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS codes;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS likes;
'''