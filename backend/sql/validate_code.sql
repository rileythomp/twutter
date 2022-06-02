SELECT EXISTS (
    SELECT * FROM codes WHERE user_id = ? AND code_hash = ? AND  expiry > ?
);