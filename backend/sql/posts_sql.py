AddPost = '''
INSERT INTO posts (post_id, user_id, post, created_at, updated_at, is_public, is_image)
VALUES (%s, %s, %s, %s, %s, %s, %s);
'''

GetPost = '''
SELECT post FROM posts WHERE post_id = %s;
'''

GetPosts = '''
SELECT posts.*, users.username,
COALESCE((SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id), 0) AS likecount, 
(SELECT COUNT(*) FROM comments WHERE posts.post_id = comments.post_id) AS commentcount
FROM posts LEFT JOIN users ON posts.user_id = users.user_id
WHERE posts.user_id = %s
ORDER BY 
'''

GetLikedPosts = '''
SELECT postlikes.*
FROM (
    SELECT * FROM likes
    WHERE user_id = %(user_id)s AND change = 1
) AS userlikes
INNER JOIN (
    SELECT posts.*, users.username,
    COALESCE((SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id), 0) AS likecount, 
    (SELECT COUNT(*) FROM comments WHERE posts.post_id = comments.post_id) AS commentcount
    FROM posts LEFT JOIN users ON posts.user_id = users.user_id
    WHERE ((posts.is_public = 1) OR (posts.user_id = %(user_id)s))
    GROUP BY (posts.post_id, users.user_id)
) AS postlikes
ON userlikes.post_id = postlikes.post_id
ORDER BY 
'''

GetPublicPosts = '''
SELECT posts.*,  users.username,
COALESCE((SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id), 0) AS likecount, 
(SELECT COUNT(*) FROM comments WHERE posts.post_id = comments.post_id) AS commentcount
FROM posts LEFT JOIN users ON posts.user_id = users.user_id
WHERE posts.user_id = %s AND posts.is_public = 1
ORDER BY 
'''

# Hacker news ranking algorithm from https://news.ycombinator.com/item?id=1781417
GetUserFeed = '''
SELECT posts.*, users.username,
COALESCE((SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id), 0) AS likecount, 
(SELECT COUNT(*) FROM comments WHERE posts.post_id = comments.post_id) AS commentcount,
(
    SELECT SUM(likes.change)/POWER((((extract(epoch from now()) - posts.created_at)/3600) + 2), 1.8)
    FROM likes WHERE posts.post_id = likes.post_id
) AS likeweighting,
(
    SELECT COUNT(*)/POWER((((extract(epoch from now()) - posts.created_at)/3600) + 2), 1.8)
    FROM comments WHERE posts.post_id = comments.post_id
) AS commentweighting
FROM posts INNER JOIN (
    SELECT followers.followed_id FROM followers
    WHERE followers.follower_id = %s ORDER BY followers.followed_id
) AS following ON following.followed_id = posts.user_id
LEFT JOIN users ON users.user_id = posts.user_id
WHERE users.is_public = 1 AND posts.is_public = 1
ORDER BY 
'''

GetAllFeed = '''
SELECT posts.*, users.username,
COALESCE((SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id), 0) AS likecount, 
(SELECT COUNT(*) FROM comments WHERE posts.post_id = comments.post_id) AS commentcount,
(
    SELECT SUM(likes.change)/POWER((((extract(epoch from now()) - posts.created_at)/3600) + 2), 1.8)
    FROM likes WHERE posts.post_id = likes.post_id
) AS likeweighting,
(
    SELECT COUNT(*)/POWER((((extract(epoch from now()) - posts.created_at)/3600) + 2), 1.8)
    FROM comments WHERE posts.post_id = comments.post_id
) AS commentweighting
FROM posts LEFT JOIN users ON users.user_id = posts.user_id
WHERE users.is_public = 1 AND posts.is_public = 1
ORDER BY 
'''

PostIsImage = '''
SELECT is_image = 1 FROM posts WHERE post_id = %s;
'''

DeletePost = '''
DELETE FROM posts WHERE user_id = %s AND post_id = %s;
'''

EditPost = '''
UPDATE posts
SET post = %s, updated_at = %s
WHERE user_id = %s AND post_id = %s;
'''

ChangePrivacy = '''
UPDATE posts
SET is_public = %s
WHERE user_id = %s AND post_id = %s;
'''

LikePost = '''
INSERT INTO likes (post_id, user_id, change)
VALUES (%(post_id)s, %(user_id)s, %(change)s)
ON CONFLICT (post_id, user_id)
DO UPDATE SET post_id = %(post_id)s, user_id = %(user_id)s, change = %(change)s;
'''

UnlikePost = '''
DELETE FROM likes WHERE post_id = %s and user_id = %s;
'''

GetLike = '''
SELECT * FROM likes WHERE post_id = %s and user_id = %s;
'''

CountLikes = '''
SELECT SUM(likes.change)
FROM likes WHERE post_id = %s;
'''