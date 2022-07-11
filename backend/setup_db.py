from db import UserRepo
from uuid import uuid4
from hashlib import sha256

def create_user(username, email, number, password: str):
    try:
        db = UserRepo()
        salt = str(uuid4())
        hashed_pw = sha256(f'{password}{salt}'.encode()).hexdigest()
        db.add_user(username, email, number, hashed_pw, salt, 1)
        db.close()
    except Exception as e:
        print(f"{'='*25}\nError creating user {username}\n{'='*25}")
    print(f'added user {username}')

def follow_user(follower, followed):
    try:
        db = UserRepo()
        followed_id = db.get_user_id_from_name(followed)
        follower_id = db.get_user_id_from_name(follower)
        db.follow_user(follower_id, followed_id)
        db.close()
    except Exception as e:
        print(f"{'='*25}\nError following user {e}\n{'='*25}")
    print(f'{follower} followed {followed}')

if __name__ == '__main__':
    create_user('riley', 'riley@gmail.com', '1234567890', 'rileypw')
    create_user('jack', 'jack@gmail.com', '1357924680', 'jackpw')
    create_user('sandi', 'sandi@gmail.com', '2468135790', 'sandipw')
    create_user('jjdin', 'jjdin@gmail.com', '9876543210', 'jjdinpw')
    follow_user('jack', 'riley')
    follow_user('riley', 'jack')