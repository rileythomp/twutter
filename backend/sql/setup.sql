CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    phone_number CHAR(10) UNIQUE,
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
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE(user_id, code_type)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id UUID PRIMARY KEY,
    user_id UUID,
    post VARCHAR,
    created_at INTEGER,
    updated_at INTEGER,
    is_public INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
    post_id UUID,
    user_id UUID,
    change INTEGER,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id UUID PRIMARY KEY,
    post_id UUID,
    user_id UUID,
    comment VARCHAR,
    created_at INTEGER,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)