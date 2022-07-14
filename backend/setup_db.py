from db import UserRepo
from uuid import uuid4
from hashlib import sha256

def create_user(username: str, email: str, number: str, password: str, bio: str, is_public: int):
    try:
        db = UserRepo()
        salt = str(uuid4())
        hashed_pw = sha256(f'{password}{salt}'.encode()).hexdigest()
        user_id = db.add_user(username, email, number, hashed_pw, salt, 1)
        db.update_user(user_id, username, email, number, bio, is_public)
        db.close()
        print(f'added user {username}')
    except Exception as e:
        print(f"{'='*25}\nError creating user {username}\n{'='*25}")

def follow_user(follower: str, followed: str):
    try:
        db = UserRepo()
        followed_id = db.get_user_id_from_name(followed)
        follower_id = db.get_user_id_from_name(follower)
        db.follow_user(follower_id, followed_id)
        db.close()
        print(f'{follower} followed {followed}')
    except Exception as e:
        print(f"{'='*25}\nError following user {e}\n{'='*25}")

if __name__ == '__main__':
    # create_user('riley', 'riley@gmail.com', '1234567890', 'rileypw', 'hi my name is riley', 1)
    # create_user('jack', 'jack@gmail.com', '1357924680', 'jackpw', 'i am jack', 1)
    # create_user('sandi', 'sandi@gmail.com', '2468135790', 'sandipw', 'this is sandi', 1)
    # create_user('jjdin', 'jjdin@gmail.com', '9876543210', 'jjdinpw', 'secret user', 1)
    # follow_user('jack', 'riley')
    # follow_user('riley', 'jack')
    # create_user('dolphinbot', 'jjdin@outlook.com', '2899838584', 'dolphinbotpw', 'I post photos of dolphins', 1)
    # follow_user('riley', 'dolphinbot')
    # create_user('snakebot', 'snakebot@gmail.com', '0000000001', 'snakebotpw', 'I post photos of snakes', 1)
    # follow_user('riley', 'snakebot')
    # create_user('gorillabot', 'gorillabot@gmail.com', '0000000002', 'gorillabotpw', 'I post photos of gorillas', 1)
    # follow_user('riley', 'gorillabot')
    # create_user('bearbot', 'bearbot@gmail.com', '0000000003', 'bearbotpw', 'I post photos of bears', 1)
    # follow_user('riley', 'bearbot')
    # create_user('catbot', 'catbot@gmail.com', '0000000004', 'catbotpw', 'I post photos of cats', 1)
    # follow_user('riley', 'catbot')
    # create_user('birdbot', 'birdbot@gmail.com', '0000000005', 'birdbotpw', 'I post photos of birds', 1)
    # follow_user('riley', 'birdbot')
    # create_user('butterflybot', 'butterflybot@gmail.com', '0000000006', 'butterflybotpw', 'I post photos of butterflys', 1)
    # follow_user('riley', 'butterflybot')
    # create_user('flowerbot', 'flowerbot@gmail.com', '0000000007', 'flowerbotpw', 'I post photos of flowers', 1)
    # follow_user('riley', 'flowerbot')
    # create_user('mountainbot', 'mountainbot@gmail.com', '0000000008', 'mountainbotpw', 'I post photos of mountains', 1)
    # follow_user('riley', 'mountainbot')
    # create_user('oceanbot', 'oceanbot@gmail.com', '0000000009', 'oceanbotpw', 'I post photos of oceans', 1)
    # follow_user('riley', 'oceanbot')
    # create_user('citybot', 'citybot@gmail.com', '0000000010', 'citybotpw', 'I post photos of citys', 1)
    # follow_user('riley', 'citybot')
    # create_user('spacebot', 'spacebot@gmail.com', '0000000011', 'spacebotpw', 'I post photos of space', 1)
    # follow_user('riley', 'spacebot')

