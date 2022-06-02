import uuid
import sqlite3

def getSqlFromFile(filename: str) -> str:
    file = open(filename, 'r')
    sql = file.read()
    file.close()
    return sql

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
        create_tables_sql = getSqlFromFile('sql/create_tables.sql')
        self.cur.executescript(create_tables_sql)
        self.conn.commit()

    def delete_tables(self):
        drop_tables_sql = getSqlFromFile('sql/drop_tables.sql')
        self.cur.executescript(drop_tables_sql)
        self.conn.commit()

    def add_user(self, username: str, email: str, phone_number: str, hashed_pw: str, salt: str):
        user_id = str(uuid.uuid4())
        add_user_sql = getSqlFromFile('sql/add_user.sql')
        self.cur.execute(add_user_sql, (user_id, username, email, phone_number, hashed_pw, salt))
        self.conn.commit()
        return user_id

    def username_exists(self, username: str) -> bool:
        username_taken_sql = getSqlFromFile('sql/username_taken.sql')
        self.cur.execute(username_taken_sql, [username])
        numRows = self.cur.fetchone()[0]
        return numRows != 0  

    def user_email_exists(self, email: str) -> bool:
        user_email_exists_sql = getSqlFromFile('sql/user_email_exists.sql')
        self.cur.execute(user_email_exists_sql, [email])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

    def user_number_exists(self, number: str) -> bool:
        user_number_exists_sql = getSqlFromFile('sql/user_number_exists.sql')
        self.cur.execute(user_number_exists_sql, [number])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

    def valid_credentials(self, username: str, hashed_pw: str):
        check_credentials_sql = getSqlFromFile('sql/check_credentials.sql')
        self.cur.execute(check_credentials_sql, [username, hashed_pw])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def get_user_id(self, username: str, hashed_pw: str):
        get_user_id_sql = getSqlFromFile('sql/get_user_id.sql')
        self.cur.execute(get_user_id_sql, [username, hashed_pw])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_from_number(self, phone_number):
        get_user_id_sql = getSqlFromFile('sql/get_user_id_from_number.sql')
        self.cur.execute(get_user_id_sql, [phone_number])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_from_email(self, email):
        get_user_id_sql = getSqlFromFile('sql/get_user_id_from_email.sql')
        self.cur.execute(get_user_id_sql, [email])
        user_id = self.cur.fetchone()[0]
        return user_id

    def get_user_id_and_code_by_number(self, phone_number):
        get_user_id_and_salt = getSqlFromFile('sql/get_user_id_and_salt_by_number.sql')
        self.cur.execute(get_user_id_and_salt, [phone_number])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id

    def get_user_id_and_code_by_email(self, email):
        get_user_id_and_salt = getSqlFromFile('sql/get_user_id_and_salt_by_email.sql')
        self.cur.execute(get_user_id_and_salt, [email])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id
    

    def get_user(self, user_id):
        get_user_sql = getSqlFromFile('sql/get_user.sql')
        self.cur.execute(get_user_sql, [user_id])
        row = self.cur.fetchone()
        user = User(row)
        return user.toJson()
   
    def save_reset_code(self, user_id: str, hashed_code: str, salt: str, expiry: int):
        code_id = str(uuid.uuid4())
        save_reset_code_sql = getSqlFromFile('sql/add_code.sql')
        self.cur.execute(save_reset_code_sql, [code_id, hashed_code, salt, user_id, expiry])
        self.conn.commit()

    def validate_code(self, user_id: str, hashed_code: str, cur_time: int):
        validate_code_sql = getSqlFromFile('sql/validate_code.sql')
        self.cur.execute(validate_code_sql, [user_id, hashed_code, cur_time])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def set_password(self, user_id: str, hashed_pw: str, salt: str):
        set_password_sql = getSqlFromFile('sql/set_password.sql')
        self.cur.execute(set_password_sql, (hashed_pw, salt, user_id))
        self.conn.commit()

    def get_salt_by_username(self, username: str):
        get_salt_sql = getSqlFromFile('sql/get_salt_by_username.sql')
        self.cur.execute(get_salt_sql, [username])
        salt = self.cur.fetchone()[0]
        return salt

    def remove_reset_code(self, code_id: str):
        remove_reset_code_sql = getSqlFromFile('sql/remove_reset_code.sql')
        self.cur.execute(remove_reset_code_sql, [code_id])
        self.conn.commit()