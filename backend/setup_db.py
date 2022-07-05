from db import DB, UserRepo
from uuid import uuid4
from hashlib import sha256

def create_user(username, email, number, password: str):
    userDb = UserRepo()
    salt = str(uuid4())
    hashed_pw = sha256(f'{password}{salt}'.encode()).hexdigest()
    userDb.add_user(username, email, number, hashed_pw, salt, 1)

if __name__ == '__main__':
    db = DB()
    db.delete_tables()
    db.create_tables()
    db.close()
    
    create_user('riley', 'rileythompson99@gmail.com', '1234567890', 'rileypw')
    create_user('jack', 'jrtutoring99@gmail.com', '9056326612', 'jackpw')
    create_user('sandi', 'sthompson07@cogeco.ca', '9053309912', 'sandipw')