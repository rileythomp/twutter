AddComment = '''
INSERT INTO comments (comment_id, post_id, user_id, comment, created_at)
VALUES (%s, %s, %s, %s, %s);
'''

GetPostComments = '''
SELECT comments.*, users.username  FROM comments
LEFT JOIN users ON users.user_id = comments.user_id
WHERE comments.post_id = %s
ORDER BY comments.created_at ASC;
'''