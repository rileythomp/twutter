from db import DB

if __name__ == '__main__':
    db = DB()
    db.delete_tables()
    db.create_tables()
    db.close()

