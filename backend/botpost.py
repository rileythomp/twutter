from random import randint
from os import getenv
from time import time
from db import PostsRepo, UserRepo

S3_ADDR = getenv('S3_ADDRESS')

def make_post(username: str, post: str, is_public: int, is_image: int):
    try:
        db = UserRepo()
        user_id = db.get_user_id_from_name(username)
        db.close()
        db = PostsRepo()
        cur_time = int(time())
        db.add_post(user_id, post, cur_time, cur_time, is_public, is_image)
        db.close()
        print(f"{'='*25}\nmade post for {username}\n{'='*25}")
    except Exception as e:
        print(f"{'='*25}\nerror making post:\n{e}\n{'='*25}")

if __name__ == '__main__':
    make_post('dolphinbot', f'{S3_ADDR}/dolphin{randint(1, 3)}.jpg', 1, 1)
else:
    print('='*25)
    print(f'no posts made, botpost.py ran with __name__: {__name__}')
    print('='*25)