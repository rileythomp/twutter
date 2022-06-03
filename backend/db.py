import uuid
import sqlite3
from sql import GetUserId, GetUserIdFromNumber, GetUserIdFromEmail, GetUserIdAndSaltByNumber, GetUserIdAndSaltByEmail, AddCode, CheckCredentials, CreateTables, DeleteTables, GetSaltByUsername, RemoveResetCode, SetPassword, UserEmailExists, UserNumberExists, UsernameExists, ValidateCode, CreateUser, GetUser

class User:
    def __init__(self, row):
        self.user_id = row[0]
        self.username = row[1]
        self.email = row[2]
        self.phone_number = row[3]

    def toJson(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'phone_number': self.phone_number
        }

class DB:
    def __init__(self):
        self.conn = sqlite3.connect(r'ppab6.db', check_same_thread=False)
        self.cur = self.conn.cursor()

    def close(self):
        self.cur.close()
        self.conn.close()

    def create_tables(self):
        self.cur.executescript(CreateTables)
        self.conn.commit()

    def delete_tables(self):
        self.cur.executescript(DeleteTables)
        self.conn.commit()

    def add_user(self, username: str, email: str, phone_number: str, hashed_pw: str, salt: str):
        user_id = str(uuid.uuid4())
        self.cur.execute(CreateUser, (user_id, username, email, phone_number, hashed_pw, salt))
        self.conn.commit()
        return user_id

    def username_exists(self, username: str) -> bool:
        self.cur.execute(UsernameExists, [username])
        numRows = self.cur.fetchone()[0]
        return numRows != 0  

    def user_email_exists(self, email: str) -> bool:
        self.cur.execute(UserEmailExists, [email])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

    def user_number_exists(self, number: str) -> bool:
        self.cur.execute(UserNumberExists, [number])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

    def valid_credentials(self, username: str, hashed_pw: str):
        self.cur.execute(CheckCredentials, [username, hashed_pw])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def get_user_id(self, username: str, hashed_pw: str):
        self.cur.execute(GetUserId, [username, hashed_pw])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_from_number(self, phone_number):
        self.cur.execute(GetUserIdFromNumber, [phone_number])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_from_email(self, email):
        self.cur.execute(GetUserIdFromEmail, [email])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_and_code_by_number(self, phone_number):
        self.cur.execute(GetUserIdAndSaltByNumber, [phone_number])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id

    def get_user_id_and_code_by_email(self, email):
        self.cur.execute(GetUserIdAndSaltByEmail, [email])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id
    

    def get_user(self, user_id):
        self.cur.execute(GetUser, [user_id])
        row = self.cur.fetchone()
        user = User(row)
        return user.toJson()
   
    def save_reset_code(self, user_id: str, hashed_code: str, salt: str, expiry: int, code_type: str):
        code_id = str(uuid.uuid4())
        self.cur.execute(AddCode, [code_id, hashed_code, salt, user_id, expiry, code_type])
        self.conn.commit()

    def validate_code(self, user_id: str, hashed_code: str, cur_time: int):
        self.cur.execute(ValidateCode, [user_id, hashed_code, cur_time])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def set_password(self, user_id: str, hashed_pw: str, salt: str):
        self.cur.execute(SetPassword, (hashed_pw, salt, user_id))
        self.conn.commit()

    def get_salt_by_username(self, username: str):
        self.cur.execute(GetSaltByUsername, [username])
        salt = self.cur.fetchone()[0]
        return salt

    def remove_reset_code(self, code_id: str):
        self.cur.execute(RemoveResetCode, [code_id])
        self.conn.commit()