AddPost = '''
INSERT INTO posts (post_id, user_id, post, created_at, updated_at, is_public)
VALUES (?, ?, ?, ?, ?, ?);
'''

GetPosts = '''
SELECT posts.*, SUM(likes.change) as likecount, users.username
FROM posts LEFT JOIN likes
ON posts.post_id = likes.post_id
LEFT JOIN users ON posts.user_id = users.user_id
WHERE posts.user_id = ?
GROUP BY posts.post_id
ORDER BY 
'''

GetLikedPosts = '''
SELECT postlikes.*
FROM (
    SELECT * FROM likes
    WHERE user_id = $1 AND change = 1
) AS userlikes
INNER JOIN (
    SELECT posts.*, SUM(likes.change) AS likecount, users.username
    FROM posts INNER JOIN likes
    ON posts.post_id = likes.post_id
    LEFT JOIN users ON posts.user_id = users.user_id
    WHERE ((posts.is_public = 1) OR (posts.user_id = $1))
    GROUP BY (posts.post_id)
) AS postlikes
ON userlikes.post_id = postlikes.post_id
ORDER BY 
'''

GetPublicPosts = '''
SELECT posts.*, SUM(likes.change) as likecount, users.username
FROM posts LEFT JOIN likes
ON posts.post_id = likes.post_id
LEFT JOIN users ON posts.user_id = users.user_id
WHERE posts.user_id = ? AND posts.is_public = 1
GROUP BY posts.post_id
ORDER BY 
'''

DeletePost = '''
DELETE FROM posts WHERE user_id = ? AND post_id = ?;
'''

EditPost = '''
UPDATE posts
SET post = ?, updated_at = ?
WHERE user_id = ? AND post_id = ?;
'''

ChangePrivacy = '''
UPDATE posts
SET is_public = ?
WHERE user_id = ? AND post_id = ?;
'''

LikePost = '''
INSERT OR REPLACE INTO likes (post_id, user_id, change)
VALUES (?, ?, ?);
'''

UnlikePost = '''
DELETE FROM likes WHERE post_id = ? and user_id = ?;
'''

GetLike = '''
SELECT * FROM likes WHERE post_id = ? and user_id = ?;
'''

CountLikes = '''
SELECT SUM(likes.change)
FROM likes WHERE post_id = ?;
'''