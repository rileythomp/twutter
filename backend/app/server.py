from os import getenv
import jsonpickle as jp
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
from db import UserRepo
from hashlib import sha256
from uuid import uuid4
from app.codes import codes
from app.posts import posts
from app.comments import comments
from usertoken import Token, GetUserIdFromJwt
import boto3 as aws

HOST_ADDR = getenv('HOST_ADDRESS')
S3_ADDR = getenv('S3_ADDRESS')
S3_BUCKET = getenv('S3_BUCKET')
S3 = 's3'
DEFAULT_IMG = 'imgs/defaultpic.jpg'
SESSION_AGE = 3600 # 1 hour

app = Flask(__name__, static_url_path='/static')
app.register_blueprint(codes)
app.register_blueprint(posts)
app.register_blueprint(comments)
CORS(app)

def valid_password(password: str) -> bool:
    pw = set(password)
    return len(password) > 7 and len(password) < 65 and \
        len(pw.intersection('0123456789')) > 0 and \
        len(pw.intersection('abcdefghijklmnopqrstuvwxyz')) > 0 and \
        len(pw.intersection('ABCDEFGHIJKLMNOPQRSTUVWXYZ')) > 0

@app.route('/', methods=['GET'])
def home():
    return 'Twutter API'

@app.route('/user/add', methods=['POST'])
def add_user():
    req = request.get_json()
    try:
        username = req['username'].lower()
        password = req['password']
        email = req['email'].lower()
        phone_number = req['phone_number']
        is_public = req['is_public']
    except KeyError:
        return make_response(jsonify('error adding user'), 400)

    phone_number = ''.join(ch for ch in phone_number if ch.isdigit())[-10:]
    
    if not valid_password(password):
        return make_response(
            jsonify('Password must be 8 - 64 characters, containing at least 1 lower case, 1 upper case and 1 number.'),
            401
        )

    try:
        db = UserRepo()
        if db.username_exists(username):
            return make_response(jsonify('username is already taken'), 401)
        if db.user_email_exists(email):
            return make_response(jsonify('email is already in use'), 401)
        if db.user_number_exists(phone_number):
            return make_response(jsonify('phone number is already in use'), 401)

        salt = str(uuid4())
        hashed_pw = sha256(f'{password}{salt}'.encode()).hexdigest()

        user_id = db.add_user(username, email, phone_number, hashed_pw, salt, is_public)
        db.close()
    except Exception:
        return make_response(jsonify('error creating user'), 400)

    s3 = aws.client('s3')
    s3.upload_file(DEFAULT_IMG, S3_BUCKET, user_id, ExtraArgs={'ACL': 'public-read'})

    token = Token(user_id, SESSION_AGE)
    return make_response(jp.encode(token), 201)

@app.route('/user/authenticate', methods=['POST'])
def authenticate_user():
    req = request.get_json()
    try:
        username = req['username'].lower()
        password = req['password']
    except KeyError:
        return make_response(jsonify('error authenticating user'), 400)

    try:
        db = UserRepo()
        if not db.username_exists(username):
            return make_response(jsonify('error authenticating user'), 401)

        salt = db.get_salt_by_username(username)
        hashed_pw = sha256(f'{password}{salt}'.encode()).hexdigest()

        valid = db.valid_credentials(username, hashed_pw)
        if not valid:
            return make_response(jsonify('error authenticating user'), 401)

        user_id = db.get_user_id(username, hashed_pw)
        db.close()
    except Exception:
        return make_response(jsonify('error authenticating user'), 500)
    
    token = Token(user_id, SESSION_AGE)
    return make_response(jp.encode(token), 200)

@app.route('/user/follow', methods=['POST'])
def follow_user():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    username = request.get_data().decode('utf-8')

    try:
        db = UserRepo()
        followed_id = db.get_user_id_from_name(username)
        db.follow_user(user_id, followed_id)
        db.close()
    except Exception:
        return make_response(jsonify('error following user'), 500)

    return make_response(jsonify('followed user'), 200)

@app.route('/user/unfollow', methods=['POST'])
def unfollow_user():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    username = request.get_data().decode('utf-8')

    try:
        db = UserRepo()
        followed_id = db.get_user_id_from_name(username)
        db.unfollow_user(user_id, followed_id)
        db.close()
    except Exception:
        return make_response(jsonify('error unfollowing user'), 500)

    return make_response(jsonify('unfollowed user'), 200)

@app.route('/user/delete', methods=['DELETE'])
def delete_user():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    try:
        db = UserRepo()
        db.remove_user(user_id)
        db.close()
    except Exception:
        return make_response(jsonify('error removing user'), 500)

    return make_response(jsonify('removed user'), 200)

@app.route('/user/update', methods=['PUT'])
def update_user():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    req = request.get_json()
    try:
        username = req['username'].lower()
        bio = req['bio']
        email = req['email'].lower()
        phone_number = req['phone_number']
        is_public = req['is_public']
    except KeyError:
        return make_response(jsonify('error updating user'), 400)

    phone_number = ''.join(ch for ch in phone_number if ch.isdigit())[-10:]

    try:
        db = UserRepo()
        if db.username_exists(username, user_id):
            return make_response(jsonify('username is already in use'), 401)
        if db.user_email_exists(email, user_id):
            return make_response(jsonify('email is already in use'), 401)
        if db.user_number_exists(phone_number, user_id):
            return make_response(jsonify('phone number is already in use'), 401)
        db.update_user(user_id, username, email, phone_number, bio, is_public)
        db.close()
    except Exception:
        return make_response(jsonify('error updating user'), 500)

    return make_response(jsonify('updated user'), 200)

@app.route('/user/setpassword', methods=['PUT'])
def set_password():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    new_password = request.get_data().decode('utf-8')
    if not valid_password(new_password):
        return make_response(
            jsonify('Password must be 8 - 64 characters, containing at least 1 lower case, 1 upper case and 1 number.'),
            401
        )

    salt = str(uuid4())
    hashed_pw = sha256(f'{new_password}{salt}'.encode()).hexdigest()

    try:
        db = UserRepo()
        user_id = db.set_password(user_id, hashed_pw, salt) 
        db.close()
    except Exception:
        return make_response(jsonify('error setting password'), 500)
    
    return make_response(jsonify('reset password'), 200)

@app.route('/user/picture', methods=['PUT'])
def change_picture():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)
    
    try:
        img = request.files.get('file')
        s3 = aws.client('s3')
        s3.upload_fileobj(img, S3_BUCKET, user_id, ExtraArgs={'ACL': 'public-read'})
    except Exception:
        return make_response(jsonify('error saving picture'), 500)
    
    return make_response(jsonify(f'{S3_ADDR}/{user_id}'), 200)

@app.route('/user', methods=['GET'])
def get_user():    
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    try:
        db = UserRepo()
        user = db.get_user(user_id)
        db.close()
    except Exception:
        return make_response(jsonify('error getting user'), 500)
    
    if user is None:
        return make_response(jsonify('no user found'), 404)

    return make_response(jp.encode(user), 200)

@app.route('/user/<username>', methods=['GET'])
def get_user_by_name(username):
    username = username.lower()
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        user_id = ''
    if access_token in [None, '']:
        user_id = ''
    else:
        user_id = GetUserIdFromJwt(access_token)

    try:    
        db = UserRepo()
        username_id = db.get_user_id_from_name(username)
        user = db.get_user(username_id)
        show_follow = False if user_id == '' else user.user_id != user_id
        following = show_follow and db.is_following(user_id, user.user_id)

        if user.is_public:
            return make_response(jp.encode({
                'user': user,
                'show_follow': show_follow,
                'following': following
            }), 200)

        if user.user_id != user_id:
            return make_response(jsonify(f'{username} is private'), 403)

        return make_response(jp.encode({
            'user': user,
            'show_follow': show_follow,
            'following': following
        }), 200)
    except Exception:
        return make_response(jsonify('error getting user'), 500)

@app.route('/user/search', methods=['GET'])
def search_users():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    search = request.args.get('search', '').lower()

    try:
        db = UserRepo()
        user = db.get_user(user_id)
        if user is None:
            return make_response(jsonify('unable to authenticate user'), 401)
        users = db.search_users(search)
        db.close()
    except Exception:
        return make_response(jsonify('error searching users'), 500)

    return make_response(jp.encode(users), 200)

@app.route('/user/following', methods=['GET'])
def get_following():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    username = request.args.get('username', '').lower()

    try:
        db = UserRepo()
        users = db.get_following(user_id) if username == '' else db.get_user_following(username)
        db.close()
    except Exception:
        return make_response(jsonify('error getting user following'), 500)

    return make_response(jp.encode(users), 200)

@app.route('/user/followers', methods=['GET'])
def get_followers():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    username = request.args.get('username', '').lower()

    try:
        db = UserRepo()
        users = db.get_followers(user_id) if username == '' else db.get_user_followers(username)
        db.close()
    except Exception:
        return make_response(jsonify('error getting user followers'), 500)

    return make_response(jp.encode(users), 200)

