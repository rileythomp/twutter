from db import UserRepo
from uuid import uuid4
from hashlib import sha256

def create_user(username, email, number, password: str):
    db = UserRepo()
    salt = str(uuid4())
    hashed_pw = sha256(f'{password}{salt}'.encode()).hexdigest()
    db.add_user(username, email, number, hashed_pw, salt, 1)
    db.close()

if __name__ == '__main__':
    create_user('riley', 'rileythompson99@gmail.com', '1234567890', 'rileypw')
    create_user('jack', 'jrtutoring99@gmail.com', '9056326612', 'jackpw')
    create_user('sandi', 'sthompson07@cogeco.ca', '9053309912', 'sandipw')