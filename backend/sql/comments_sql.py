AddComment = '''
INSERT INTO comments (comment_id, post_id, user_id, comment, created_at)
VALUES (?, ?, ?, ?, ?);
'''

GetPostComments = '''
SELECT comments.*, users.username  FROM comments
LEFT JOIN users ON users.user_id = comments.user_id
WHERE post_id = ?
'''