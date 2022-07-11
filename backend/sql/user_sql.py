AddUser = '''
INSERT INTO users (user_id, username, email, phone_number, is_public, password_hash, password_salt) 
VALUES (%s, %s, %s, %s, %s, %s, %s);
'''

RemoveUser = '''
DELETE FROM users WHERE user_id = %s;
'''

UpdateUser = '''
UPDATE users
SET username = %s, email = %s, phone_number = %s, bio = %s, is_public = %s
WHERE user_id = %s;
'''

SetPassword = '''
UPDATE users
SET password_hash = %s, password_salt = %s
WHERE user_id = %s;
'''

GetUser = '''
SELECT users.*,
(SELECT COUNT(*) FROM followers WHERE followers.follower_id = users.user_id) AS followingcount,
(SELECT COUNT(*) FROM followers WHERE followers.followed_id = users.user_id) AS followercount
FROM users where user_id = %s;
'''

StartSearchUsers = '''
SELECT * FROM users WHERE is_public = 1 AND username LIKE CONCAT(%s, '%%') LIMIT 10;
'''

NotStartSearchUsers = '''
SELECT * FROM users WHERE is_public = 1 AND username NOT LIKE CONCAT(%(search)s, '%%') AND username LIKE CONCAT('%%', %(search)s, '%%') LIMIT 10;
'''

GetFollowing = '''
SELECT users.* FROM users
LEFT JOIN followers ON followers.followed_id = users.user_id
WHERE followers.follower_id = %s;
'''

GetFollowers = '''
SELECT users.* FROM users
LEFT JOIN followers ON followers.follower_id = users.user_id
WHERE followers.followed_id = %s;
'''

GetUserFollowing = '''
SELECT users2.* FROM followers AS followers
LEFT JOIN users AS users1 ON followers.follower_id = users1.user_id
LEFT JOIN users AS users2 ON followers.followed_id = users2.user_id
WHERE users1.username = %s;
'''

GetUserFollowers = '''
SELECT users2.* FROM followers AS followers
LEFT JOIN users AS users1 ON followers.followed_id = users1.user_id
LEFT JOIN users AS users2 ON followers.follower_id = users2.user_id
WHERE users1.username = %s;
'''

GetUserId = '''
SELECT user_id FROM users WHERE username = %s AND password_hash = %s;
'''

GetUserIdFromName = '''
SELECT user_id FROM users WHERE username = %s;
'''

GetUserIdFromNumber = '''
SELECT user_id FROM users WHERE phone_number = %s;
'''

GetUserIdFromEmail = '''
SELECT user_id FROM users WHERE email = %s;
'''

GetUserIdAndCodeByNumber = '''
SELECT u.user_id, c.code_salt, c.code_id
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.phone_number = %s AND c.code_type = %s;
'''

GetUserIdAndCodeByEmail = '''
SELECT u.user_id, c.code_salt, c.code_id
FROM users u
LEFT JOIN codes c
ON u.user_id = c.user_id
WHERE u.email = %s AND c.code_type = %s;
'''

GetSaltByUsername = '''
SELECT password_salt FROM users WHERE username = %s;
'''

UsernameExists = '''
SELECT COUNT(*) FROM users WHERE username = %s
'''

UsernameInUse = '''
SELECT COUNT(*) FROM users WHERE username = %s AND user_id != %s;
'''

UserEmailExists = '''
SELECT COUNT(*) FROM users WHERE email = %s;
'''

UserEmailInUse = '''
SELECT COUNT(*) FROM users WHERE email = %s AND user_id != %s;
'''

UserNumberExists = '''
SELECT COUNT(*) FROM users WHERE phone_number = %s;
'''

UserPhoneInUse = '''
SELECT COUNT(*) FROM users WHERE phone_number = %s AND user_id != %s;
'''

CheckCredentials = '''
SELECT EXISTS (
    SELECT * FROM users WHERE username = %s AND password_hash = %s
);
'''

FollowUser = '''
INSERT INTO followers (follower_id, followed_id)
VALUES (%s, %s);
'''

UnfollowUser = '''
DELETE FROM followers WHERE follower_id = %s AND followed_id = %s;
'''

IsFollowing = '''
SELECT COUNT(*) FROM followers WHERE follower_id = %s AND followed_id = %s;
'''