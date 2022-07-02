AddComment = '''
INSERT INTO comments (comment_id, post_id, user_id, comment, created_at)
VALUES (?, ?, ?, ?, ?);
'''

GetPostComments = '''
SELECT * FROM comments WHERE post_id = ?
'''