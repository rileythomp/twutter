AddComment = '''
INSERT INTO comments (comment_id, user_id, comment, created_at)
VALUES (?, ?, ?, ?);
'''