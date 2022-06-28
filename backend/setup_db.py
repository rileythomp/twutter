from db import DB, UserRepo
from uuid import uuid4
from hashlib import sha256

if __name__ == '__main__':
    db = DB()
    db.delete_tables()
    db.create_tables()
    db.close()
    
    userDb = UserRepo()
    salt = str(uuid4())
    hashed_pw = sha256(f'rileypw{salt}'.encode()).hexdigest()
    userDb.add_user('riley', 'rileythompson99@gmail.com', '2899838584', hashed_pw, salt, 1)
    salt = str(uuid4())
    hashed_pw = sha256(f'jackpw{salt}'.encode()).hexdigest()
    userDb.add_user('jack', 'jrtutoring99@gmail.com', '9053309912', hashed_pw, salt, 1)
    userDb.close()

