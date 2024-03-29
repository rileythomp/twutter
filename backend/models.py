from os import getenv

S3_ADDR = getenv('S3_ADDRESS')

class Comment:
    def __init__(self, row):
        self.comment_id = row[0]
        self.post_id = row[1]
        self.user_id = row[2]
        self.comment = row[3]
        self.created_at = row[4]
        self.author = row[5]

class Like:
    def __init__(self, row):
        self.post_id = row[0]
        self.user_id = row[1]
        self.change = row[2]

class Post:
    def __init__(self, row):
        # from posts table
        self.post_id = row[0]
        self.user_id = row[1]
        self.post = row[2]
        self.created_at = row[3]
        self.updated_at = row[4]
        self.is_public = row[5]
        self.is_image = row[6]
        # from other tables
        self.author = len(row) > 7 and row[7]
        self.likes = len(row) > 8 and row[8]
        self.comments = len(row) > 9 and row[9]

class User:
    def __init__(self, row):
        # from users table
        self.user_id = row[0]
        self.username = row[1]
        self.email = row[2]
        self.phone_number = row[3]
        self.bio = row[4]
        self.is_public = row[5]
        # from other tables
        self.imgUrl = f'{S3_ADDR}/{self.user_id}'
        self.following = len(row) > 8 and row[8]
        self.followers = len(row) > 9 and row[9]
