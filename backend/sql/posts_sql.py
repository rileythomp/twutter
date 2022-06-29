AddPost = '''
INSERT INTO posts (post_id, user_id, post, created_at, updated_at)
VALUES (?, ?, ?, ?, ?);
'''

GetPosts = '''
SELECT * FROM posts WHERE user_id = ?;
'''