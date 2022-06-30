AddPost = '''
INSERT INTO posts (post_id, user_id, post, created_at, updated_at, is_public)
VALUES (?, ?, ?, ?, ?, ?);
'''

GetPosts = '''
SELECT * FROM posts WHERE user_id = ?
ORDER BY created_at DESC;
'''

GetPublicPosts = '''
SELECT * FROM posts
WHERE user_id = ? 
AND is_public = 1
ORDER BY created_at DESC;
'''

DeletePost = '''
DELETE FROM posts WHERE user_id = ? AND post_id = ?;
'''