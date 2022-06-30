from uuid import uuid4
from sqlite3 import connect
from sql.setup import CreateTables, DeleteTables
from sql.user_sql import GetUser, AddUser, CheckCredentials, GetSaltByUsername, \
GetUserId, GetUserIdFromNumber, GetUserIdFromEmail, UserEmailExists, UserNumberExists, \
UsernameExists, UpdateUser, RemoveUser, SetPassword, GetUserIdAndSaltByNumber, \
GetUserIdAndSaltByEmail, GetUserIdFromName, UserIsPublic
from sql.codes_sql import VerifyCodeExists, RemoveVerifyCode, RemoveResetCode, \
AddCode, ValidateCode
from sql.posts_sql import AddPost, GetPosts, GetPublicPosts
from models import User, Post
        
class DB:
    def __init__(self):
        self.conn = connect(r'ppab6.db', check_same_thread=False)
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
        
class PostsRepo:
    def __init__(self):
        self.conn = connect(r'ppab6.db', check_same_thread=False)
        self.cur = self.conn.cursor()
        
    def close(self):
        self.cur.close()
        self.conn.close()
        
    def add_post(self, user_id: str, post: str, created_at: int, updated_at: int, is_public: bool):
        post_id = str(uuid4())
        self.cur.execute(AddPost, [post_id, user_id, post, created_at, updated_at, is_public])
        self.conn.commit()
        
    def get_posts(self, user_id: str):
        self.cur.execute(GetPosts, [user_id])
        posts = []
        for row in self.cur:
            posts.append(Post(row).toJson())
        return posts

    def get_public_posts(self, user_id: str):
        self.cur.execute(GetPublicPosts, [user_id])
        posts = []
        for row in self.cur:
            posts.append(Post(row).toJson())
        return posts
        
class UserRepo:
    def __init__(self):
        self.conn = connect(r'ppab6.db', check_same_thread=False)
        self.cur = self.conn.cursor()
    
    def close(self):
        self.cur.close()
        self.conn.close()
        
    def add_user(self, username: str, email: str, phone_number: str, hashed_pw: str, salt: str, is_public: int) -> str:
        user_id = str(uuid4())
        self.cur.execute(AddUser, (user_id, username, email, phone_number, is_public, hashed_pw, salt))
        self.conn.commit()
        return user_id
    
    def remove_user(self, user_id: str):
        self.cur.execute(RemoveUser, [user_id])
        self.conn.commit()

    def update_user(self, user_id: str, username: str, email: str, number: str, bio: str, is_public: int):
        self.cur.execute(UpdateUser, [username, email, number, bio, is_public, user_id])
        self.conn.commit()
        
    def set_password(self, user_id: str, hashed_pw: str, salt: str):
        self.cur.execute(SetPassword, (hashed_pw, salt, user_id))
        self.conn.commit()
        
    def get_user(self, user_id: str) -> User:
        self.cur.execute(GetUser, [user_id])
        row = self.cur.fetchone()
        user = User(row)
        return user
    
    def get_user_id(self, username: str, hashed_pw: str) -> str:
        self.cur.execute(GetUserId, [username, hashed_pw])
        user_id = self.cur.fetchone()[0]
        return user_id
    
    def get_user_id_from_name(self, username: str) -> str:
        self.cur.execute(GetUserIdFromName, [username])
        user_id = self.cur.fetchone()[0]
        return user_id
    
    def get_user_id_from_number(self, phone_number: str) -> str:
        self.cur.execute(GetUserIdFromNumber, [phone_number])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_from_email(self, email: str) -> str:
        self.cur.execute(GetUserIdFromEmail, [email])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_and_code_by_number(self, phone_number: str):
        self.cur.execute(GetUserIdAndSaltByNumber, [phone_number])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id

    def get_user_id_and_code_by_email(self, email: str):
        self.cur.execute(GetUserIdAndSaltByEmail, [email])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id
    
    def get_salt_by_username(self, username: str) -> str:
        self.cur.execute(GetSaltByUsername, [username])
        salt = self.cur.fetchone()[0]
        return salt
    
    def user_is_public(self, username: str) -> bool:
        self.cur.execute(UserIsPublic, [username])
        is_public = self.cur.fetchone()[0]
        return is_public == 1

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

    def valid_credentials(self, username: str, hashed_pw: str) -> bool:
        self.cur.execute(CheckCredentials, [username, hashed_pw])
        exists = self.cur.fetchone()[0]
        return exists == 1

class CodesRepo:
    def __init__(self):
        self.conn = connect(r'ppab6.db', check_same_thread=False)
        self.cur = self.conn.cursor()

    def close(self):
        self.cur.close()
        self.conn.close()
        
    def save_reset_code(self, user_id: str, hashed_code: str, salt: str, expiry: int, code_type: str):
        code_id = str(uuid4())
        self.cur.execute(AddCode, [code_id, hashed_code, salt, user_id, expiry, code_type])
        self.conn.commit()
        
    def remove_reset_code(self, code_id: str):
        self.cur.execute(RemoveResetCode, [code_id])
        self.conn.commit()

    def remove_verify_code(self, user_id: str):
        self.cur.execute(RemoveVerifyCode, [user_id])
        self.conn.commit()

    def validate_code(self, user_id: str, hashed_code: str, cur_time: int) -> bool:
        self.cur.execute(ValidateCode, [user_id, hashed_code, cur_time])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def verify_code_exists(self, user_id: str) -> bool:
        self.cur.execute(VerifyCodeExists, [user_id])
        exists = self.cur.fetchone()[0]
        return exists == 1