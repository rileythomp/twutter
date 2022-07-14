from random import randint
from os import getenv
from time import time
from db import PostsRepo, UserRepo
from ast import literal_eval
import requests

API_NINJA_KEY = getenv('API_NINJA_KEY')
API_NINJA_URL = getenv('API_NINJA_URL')
S3_ADDR = getenv('S3_ADDRESS')

class ApiNinjaError(Exception): pass

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

bots = [
    'dolphinbot',
    'snakebot',
    'gorillabot',
    'bearbot',
    'catbot',
    'birdbot',
    'butterflybot',
    'flowerbot',
    'mountainbot',
    'oceanbot',
    'citybot',
    'spacebot',
    'castlebot'
]

if __name__ == '__main__':
    try:
        # image bots
        for i, bot in enumerate(bots):
            make_post(bot, f'{S3_ADDR}/{bot}/{randint(0, 99)}.jpg', 1, 1)
        # text bots
        bot = 'factbot'
        response = requests.get(API_NINJA_URL, headers={'X-Api-Key': API_NINJA_KEY})
        if response.status_code == requests.codes.ok:
            fact = literal_eval(response.text)[0]['fact']
            if fact[-1] != '.': fact += '.'
        else:
            raise ApiNinjaError('Error getting fact from Api Ninja')
        make_post(bot, fact, 1, 0)
    except Exception as e:
        print('='*25)
        print(f'error making post for {bot}:')
        print(e)
        print('='*25)
else:
    print('='*25)
    print(f'no posts made, botpost.py ran with __name__: {__name__}')
    print('='*25)