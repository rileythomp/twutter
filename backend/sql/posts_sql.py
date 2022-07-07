AddPost = '''
INSERT INTO posts (post_id, user_id, post, created_at, updated_at, is_public)
VALUES (%s, %s, %s, %s, %s, %s);
'''

GetPosts = '''
SELECT posts.*, users.username,
(SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id) AS likecount, 
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
    (SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id) AS likecount, 
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
(SELECT SUM(likes.change) FROM likes WHERE posts.post_id = likes.post_id) AS likecount, 
(SELECT COUNT(*) FROM comments WHERE posts.post_id = comments.post_id) AS commentcount
FROM posts LEFT JOIN users ON posts.user_id = users.user_id
WHERE posts.user_id = %s AND posts.is_public = 1
ORDER BY 
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