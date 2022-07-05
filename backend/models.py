from os.path import exists

HOST_ADDR = 'http://localhost:5000'

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
        self.post_id = row[0]
        self.user_id = row[1]
        self.post = row[2]
        self.created_at = row[3]
        self.updated_at = row[4]
        self.is_public = row[5]
        self.likes = 0 if row[6] is None else row[6]
        self.author = row[7]

class User:
    def __init__(self, row):
        self.user_id = row[0]
        self.username = row[1]
        self.email = row[2]
        self.phone_number = row[3]
        self.bio = row[4]
        self.is_public = row[5]
        file_exists = exists(f'./app/imgs/{self.user_id}')
        self.imgUrl = f'{HOST_ADDR}/imgs/{self.user_id}' if file_exists else f'{HOST_ADDR}/imgs/defaultpic.jpg'
