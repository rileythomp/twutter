import jwt
import flask
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from db import DB
import hashlib
import uuid
from app.codes import codes
from utils import getJwt, valid_password

SessionAge = 3600 # 1 hour

app = Flask(__name__, static_url_path='/static')
app.register_blueprint(codes)
CORS(app)
app.config['DEBUG'] = True

@app.route('/', methods=['GET'])
def home():
    return 'UserAuth API'

@app.route('/user/add', methods=['POST'])
def add_user():
    req = flask.request.get_json()
    try:
        username = req['username']
        password = req['password']
        email = req['email']
        phone_number = req['phone_number']
    except KeyError:
        return make_response(
            jsonify('error adding user'),
            400
        )
    
    if not valid_password(password):
        return make_response(
            jsonify('Password must be 8 - 64 characters, containing at least 1 lower case, 1 upper case and 1 number.'),
            401
        )

    db = DB()

    if db.username_exists(username):
        return make_response(
            jsonify('username is already taken'),
            401
        )

    if db.user_email_exists(email):
        return make_response(
            jsonify('email is already in use'),
            401
        )

    if db.user_number_exists(phone_number):
        return make_response(
            jsonify('phone number is already in use'),
            401
        )
    
    salt = str(uuid.uuid4())
    hashed_pw = hashlib.sha256(f'{password}{salt}'.encode()).hexdigest()
    user_id = db.add_user(username, email, phone_number, hashed_pw, salt)

    db.close()

    token = getJwt(user_id, SessionAge)
    return make_response(jsonify(token), 200)

@app.route('/user/authenticate', methods=['POST'])
def authenticate_user():
    req = flask.request.get_json()
    try:
        username = req['username']
        password = req['password']
    except KeyError:
        return make_response(jsonify('error authenticating user'), 401)

    db = DB()

    if not db.username_exists(username):
        return make_response(
            jsonify('error authenticating user'),
            401
        )

    salt = db.get_salt_by_username(username)
    hashed_pw = hashlib.sha256(f'{password}{salt}'.encode()).hexdigest()

    valid = db.valid_credentials(username, hashed_pw)
    if not valid:
        return make_response(jsonify('error authenticating user'), 401)

    user_id = db.get_user_id(username, hashed_pw)

    db.close()
    
    token = getJwt(user_id, SessionAge)
    return make_response(jsonify(token), 200)

@app.route('/user/setpassword', methods=['POST'])
def set_password():
    try:
        access_token = flask.request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)

    with open('jwtRS256.key.pub', 'r') as file:
        public_key = file.read()
    dec_jwt = jwt.decode(access_token, public_key, algorithms='RS256')
    user_id = dec_jwt['user_id']

    new_password = flask.request.get_data().decode('utf-8')
    if not valid_password(new_password):
        print(new_password)
        return make_response(
            jsonify('Password must be 8 - 64 characters, containing at least 1 lower case, 1 upper case and 1 number.'),
            401
        )

    salt = str(uuid.uuid4())
    hashed_pw = hashlib.sha256(f'{new_password}{salt}'.encode()).hexdigest()

    db = DB()

    user_id = db.set_password(user_id, hashed_pw, salt)

    db.close()
    
    return make_response(jsonify('reset password'), 200)

@app.route('/user', methods=['GET'])
def get_user():    
    try:
        access_token = flask.request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)

    with open('jwtRS256.key.pub', 'r') as file:
        public_key = file.read()
    dec_jwt = jwt.decode(access_token, public_key, algorithms='RS256')
    user_id = dec_jwt['user_id']

    db = DB()

    user = db.get_user(user_id)

    db.close()

    return make_response(jsonify(user), 200)

@app.route('/user/delete', methods=['DELETE'])
def delete_user():
    try:
        access_token = flask.request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)

    with open('jwtRS256.key.pub', 'r') as file:
        public_key = file.read()
    dec_jwt = jwt.decode(access_token, public_key, algorithms='RS256')
    user_id = dec_jwt['user_id']

    db = DB()

    db.remove_user(user_id)

    db.close()

    return make_response(jsonify('removed used'), 200)