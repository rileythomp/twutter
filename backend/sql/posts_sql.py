AddPost = '''
INSERT INTO posts (post_id, user_id, post, created_at, updated_at, is_public)
VALUES (?, ?, ?, ?, ?, ?);
'''

GetPosts = '''
SELECT posts.*, count(1)
FROM posts LEFT JOIN likes
ON posts.post_id = likes.post_id
WHERE posts.user_id = ?
GROUP BY posts.post_id
ORDER BY posts.created_at DESC;
'''

GetPublicPosts = '''
SELECT posts.*, count(1)
FROM posts LEFT JOIN likes
ON posts.post_id = likes.post_id
WHERE posts.user_id = ? AND is_public = 1
GROUP BY posts.post_id
ORDER BY posts.created_at DESC;
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
INSERT OR IGNORE INTO likes (post_id, user_id, liked_at)
VALUES (?, ?, ?);
'''