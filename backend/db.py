from uuid import uuid4
from sql.user_sql import *
from sql.codes_sql import *
from sql.posts_sql import *
from sql.comments_sql import *
from models import User, Post, Like, Comment
from psycopg2 import connect
from os import getenv

DATABASE_URL = getenv('DATABASE_URL')

class CommentsRepo:
    def __init__(self):
        self.conn = connect(DATABASE_URL, sslmode='require')
        self.cur = self.conn.cursor()
    
    def close(self):
        self.cur.close()
        self.conn.close()

    def add_comment(self, post_id: str, user_id: str, comment: str, created_at: str):
        comment_id = str(uuid4())
        self.cur.execute(AddComment, [comment_id, post_id, user_id, comment, created_at])
        self.conn.commit()

    def get_post_comments(self, post_id: str) -> list[Comment]:
        self.cur.execute(GetPostComments, [post_id])
        comments = [Comment(row) for row in self.cur]
        return comments
        
class PostsRepo:
    def __init__(self):
        self.conn = connect(DATABASE_URL, sslmode='require')
        self.cur = self.conn.cursor()
        
    def close(self):
        self.cur.close()
        self.conn.close()
        
    def add_post(self, user_id: str, post: str, created_at: int, updated_at: int, is_public: bool, is_image: bool):
        post_id = str(uuid4())
        self.cur.execute(AddPost, [post_id, user_id, post, created_at, updated_at, is_public, is_image])
        self.cur.execute(LikePost, {'post_id': post_id, 'user_id': user_id, 'change': 1})
        self.conn.commit()
        
    def get_posts(self, user_id: str, sort_by: str, page: int) -> list[Post]:
        query = GetPosts
        order = 'posts.created_at DESC NULLS LAST'
        if sort_by == 'oldest':
            order = 'posts.created_at ASC NULLS FIRST'
        elif sort_by == 'liked':
            order = 'likecount DESC NULLS LAST'
        elif sort_by == 'disliked':
            order = 'likecount ASC NULLS FIRST'
        elif sort_by == 'commented':
            order = 'commentcount DESC NULLS LAST'
        elif sort_by == 'uncommented':
            order = 'commentcount ASC NULLS FIRST'
        self.cur.execute(query.format(order), [user_id, page*20])
        return [Post(row) for row in self.cur]

    def get_liked_posts(self, user_id: str, sort_by: str, page: int) -> list[Post]:
        query = GetLikedPosts
        order = 'postlikes.created_at DESC NULLS LAST'
        if sort_by == 'oldest':
            order = 'postlikes.created_at ASC NULLS FIRST'
        elif sort_by == 'liked':
            order = 'postlikes.likecount DESC NULLS LAST'
        elif sort_by == 'disliked':
            order = 'postlikes.likecount ASC NULLS FIRST'
        elif sort_by == 'commented':
            order = 'postlikes.commentcount DESC NULLS LAST'
        elif sort_by == 'uncommented':
            order = 'postlikes.commentcount ASC NULLS FIRST'
        self.cur.execute(query.format(order), {'user_id': user_id, 'page': page*20})
        return [Post(row) for row in self.cur]

    def get_public_posts(self, user_id: str, sort_by: str, page: int) -> list[Post]:
        query = GetPublicPosts
        order = 'posts.created_at DESC NULLS LAST'
        if sort_by == 'oldest':
            order = 'posts.created_at ASC NULLS FIRST'
        elif sort_by == 'liked':
            order = 'likecount DESC NULLS LAST'
        elif sort_by == 'disliked':
            order = 'likecount ASC NULLS FIRST'
        elif sort_by == 'commented':
            order = 'commentcount DESC NULLS LAST'
        elif sort_by == 'uncommented':
            order = 'commentcount ASC NULLS FIRST'
        self.cur.execute(query.format(order), [user_id, page*20])
        return [Post(row) for row in self.cur]

    def get_user_feed(self, user_id: str, sort_by: str, page: int) -> list[Post]:
        query = GetUserFeed
        order = 'likeweighting DESC NULLS LAST' # default is popular
        if sort_by == 'newest':
            order = 'posts.created_at DESC NULLS LAST'
        elif sort_by == 'discussed':
            order = 'commentweighting DESC NULLS LAST'
        self.cur.execute(query.format(order), [user_id, page*20])
        return [Post(row) for row in self.cur]

    def get_all_feed(self, sort_by: str, page: int) -> list[Post]:
        query = GetAllFeed
        order = 'likeweighting DESC NULLS LAST' # default is popular
        if sort_by == 'newest-all':
            order = 'posts.created_at DESC NULLS LAST'
        elif sort_by == 'discussed-all':
            order = 'commentweighting DESC NULLS LAST'
        self.cur.execute(query.format(order), [page*20])
        return [Post(row) for row in self.cur]

    def post_is_liked(self, user_id: str, post_id: str) -> tuple[bool, bool]:
        self.cur.execute(GetLike, [post_id, user_id])
        row = self.cur.fetchone()
        liked = row is not None and row[2] == 1
        disliked = row is not None and row[2] == -1 
        return liked, disliked
    
    def get_post(self, post_id: str) -> bool:
        self.cur.execute(GetPost, [post_id])
        row = self.cur.fetchone()
        return row[0] if row is not None else None

    def post_is_image(self, post_id: str) -> bool:
        self.cur.execute(PostIsImage, [post_id])
        is_image = self.cur.fetchone()[0]
        return is_image == 1

    def delete_post(self, post_id: str, user_id: str) -> bool:
        self.cur.execute(DeletePost, [user_id, post_id])
        self.conn.commit()

    def edit_post(self, post_id: str, user_id: str, post: str, updated_at: int):
        self.cur.execute(EditPost, [post, updated_at, user_id, post_id])
        self.conn.commit()

    def change_privacy(self, post_id: str, user_id: str, is_public: bool):
        self.cur.execute(ChangePrivacy, [is_public, user_id, post_id])
        self.conn.commit()

    def like_post(self, post_id: str, user_id: str, change: int):
        self.cur.execute(LikePost, {'post_id': post_id, 'user_id': user_id, 'change': change})
        self.conn.commit()

    def unlike_post(self, post_id: str, user_id: str):
        self.cur.execute(UnlikePost, [post_id, user_id])
        self.conn.commit()

    def get_like(self, post_id: str, user_id: str) -> Like | None:
        self.cur.execute(GetLike, [post_id, user_id])
        row = self.cur.fetchone()
        if row is None: return None
        like = Like(row)
        return like

    def count_likes(self, post_id: str) -> int:
        self.cur.execute(CountLikes, [post_id])
        count = self.cur.fetchone()[0]
        return 0 if count is None else count

class UserRepo:
    def __init__(self):
        self.conn = connect(DATABASE_URL, sslmode='require')
        self.cur = self.conn.cursor()
    
    def close(self):
        self.cur.close()
        self.conn.close()
        
    def add_user(self, username: str, email: str, phone_number: str, hashed_pw: str, salt: str, is_public: int) -> str:
        user_id = str(uuid4())
        self.cur.execute(AddUser, [user_id, username, email, phone_number, is_public, hashed_pw, salt])
        self.conn.commit()
        return user_id
    
    def remove_user(self, user_id: str):
        self.cur.execute(RemoveUser, [user_id])
        self.conn.commit()

    def update_user(self, user_id: str, username: str, email: str, number: str, bio: str, is_public: int):
        self.cur.execute(UpdateUser, [username, email, number, bio, is_public, user_id])
        self.conn.commit()
        
    def set_password(self, user_id: str, hashed_pw: str, salt: str):
        self.cur.execute(SetPassword, [hashed_pw, salt, user_id])
        self.conn.commit()
        
    def get_user(self, user_id: str) -> User:
        self.cur.execute(GetUser, [user_id])
        row = self.cur.fetchone()
        return User(row) if row is not None else None
    
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

    def get_user_id_and_code_by_number(self, phone_number: str, code_type: str):
        self.cur.execute(GetUserIdAndCodeByNumber, [phone_number, code_type])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id

    def get_user_id_and_code_by_email(self, email: str, code_type: str):
        self.cur.execute(GetUserIdAndCodeByEmail, [email, code_type])
        row = self.cur.fetchone()
        user_id = row[0]
        salt = row[1]
        code_id = row[2]
        return user_id, salt, code_id
    
    def get_salt_by_username(self, username: str) -> str:
        self.cur.execute(GetSaltByUsername, [username])
        salt = self.cur.fetchone()[0]
        return salt

    def username_exists(self, username: str, user_id=None) -> bool:
        if user_id is None:
            self.cur.execute(UsernameExists, [username])
        else:
            self.cur.execute(UsernameInUse, [username, user_id])
        numRows = self.cur.fetchone()[0]
        return numRows != 0  

    def user_email_exists(self, email: str, user_id=None) -> bool:
        if user_id is None:
            self.cur.execute(UserEmailExists, [email])
        else:
            self.cur.execute(UserEmailInUse, [email, user_id])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

    def user_number_exists(self, number: str, user_id=None) -> bool:
        if user_id is None:
            self.cur.execute(UserNumberExists, [number])
        else:
            self.cur.execute(UserPhoneInUse, [number, user_id])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

    def valid_credentials(self, username: str, hashed_pw: str) -> bool:
        self.cur.execute(CheckCredentials, [username, hashed_pw])
        row = self.cur.fetchone()
        exists = row[0]
        return exists == 1

    def search_users(self, search: str) -> list[User]:
        users = []
        self.cur.execute(StartSearchUsers, [search])
        for row in self.cur:
            users.append(User(row))
        self.cur.execute(NotStartSearchUsers, {'search': search})
        for row in self.cur:
            users.append(User(row))
        return users

    def get_following(self, user_id: str) -> list[User]:
        self.cur.execute(GetFollowing, [user_id])
        return [User(row) for row in self.cur]

    def get_followers(self, user_id: str) -> list[User]:
        self.cur.execute(GetFollowers, [user_id])
        return [User(row) for row in self.cur]

    def get_user_following(self, username: str) -> list[User]:
        self.cur.execute(GetUserFollowing, [username])
        return [User(row) for row in self.cur]

    def get_user_followers(self,  username: str) -> list[User]:
        self.cur.execute(GetUserFollowers, [username])
        return [User(row) for row in self.cur]

    def follow_user(self, follower_id: str, followed_id: str):
        self.cur.execute(FollowUser, [follower_id, followed_id])
        self.conn.commit()

    def unfollow_user(self, follower_id: str, followed_id: str):
        self.cur.execute(UnfollowUser, [follower_id, followed_id])
        self.conn.commit()

    def is_following(self, follower_id: str, followed_id: str):
        self.cur.execute(IsFollowing, [follower_id, followed_id])
        row = self.cur.fetchone()
        numRows = row[0]
        return numRows != 0

class CodesRepo:
    def __init__(self):
        self.conn = connect(DATABASE_URL, sslmode='require')
        self.cur = self.conn.cursor()

    def close(self):
        self.cur.close()
        self.conn.close()
        
    def save_auth_code(self, user_id: str, hashed_code: str, salt: str, expiry: int, code_type: str):
        code_id = str(uuid4())
        self.cur.execute(AddCode, [code_id, hashed_code, salt, user_id, expiry, code_type])
        self.conn.commit()
        
    def remove_auth_code(self, code_id: str, code_type: str):
        self.cur.execute(RemoveAuthCode, [code_id, code_type])
        self.conn.commit()

    def remove_expired_code(self, user_id: str, code_type: str):
        self.cur.execute(RemoveExpiredCode, [user_id, code_type])
        self.conn.commit()

    def remove_unsent_code(self, user_id: str, hashed_code: str, salt: str, expiry: int, code_type: str):
        self.cur.execute(RemoveUnsentCode, [user_id, hashed_code, salt, expiry, code_type])
        self.conn.commit()

    def validate_code(self, user_id: str, hashed_code: str, cur_time: int, code_type: str) -> bool:
        self.cur.execute(ValidateCode, [user_id, hashed_code, cur_time, code_type])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def verify_code_expired(self, user_id: str) -> bool:
        self.cur.execute(VerifyCodeExists, [user_id])
        exists = self.cur.fetchone()[0]
        return exists == 1

    def get_code_by_user_id(self, user_id: str, code_type: str):
        self.cur.execute(GetCodeByUserId, [user_id, code_type])
        row = self.cur.fetchone()
        salt = row[0]
        code_id = row[1]
        return salt, code_id