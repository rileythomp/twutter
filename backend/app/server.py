import time
import jwt
import flask
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from db import DB
import hashlib
from random import randint
import uuid
import time
import threading
from messages import sendPasswordResetEmail, sendPasswordResetSMS, sendVerifySMS, sendVeryifyEmail

def valid_password(password: str) -> bool:
    pw = set(password)
    return len(password) > 7 and len(password) < 65 and \
        len(pw.intersection('0123456789')) > 0 and \
        len(pw.intersection('abcdefghijklmnopqrstuvwxyz')) > 0 and \
        len(pw.intersection('ABCDEFGHIJKLMNOPQRSTUVWXYZ')) > 0

def getJwt(user_id, max_age):
    enc_jwt = jwt.encode({
        'user_id': user_id,
    }, app.secret_key, algorithm='RS256')

    return {
        'token': enc_jwt,
        'token_type': 'bearer',
        'max_age': max_age
    }

AuthCodeAge = 600 # 10 mins
SessionAge = 3600 # 1 hour

app = Flask(__name__, static_url_path='/static')
with open('jwtRS256.key', 'r') as file:
    app.secret_key = file.read()
with open('jwtRS256.key.pub', 'r') as file:
    public_key = file.read()
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

    dec_jwt = jwt.decode(access_token, public_key, algorithms='RS256')
    user_id = dec_jwt['user_id']

    db = DB()

    user = db.get_user(user_id)

    db.close()

    return make_response(jsonify(user), 200)

@app.route('/code/passwordreset/email', methods=['POST'])
def email_password_reset():
    user_email = flask.request.get_data().decode('utf-8')
    reset_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])

    db = DB()

    if not db.user_email_exists(user_email):
        return make_response(
            jsonify('no user associated with this email.'),
            401
        )

    salt = str(uuid.uuid4())
    hashed_code = hashlib.sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    expiry = int(time.time()) + AuthCodeAge
    user_id = db.get_user_id_from_email(user_email)
    db.save_reset_code(user_id, hashed_code, salt, expiry, 'password_reset')

    db.close()

    sendPasswordResetEmail(user_email, reset_code)

    return make_response(jsonify(f'sent email to {user_email}'), 200)

@app.route('/code/passwordreset/sms', methods=['POST'])
def sms_password_reset():
    user_number = flask.request.get_data().decode('utf-8')
    reset_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])

    db = DB()

    if not db.user_number_exists(user_number):
        return make_response(
            jsonify('no user associated with this number.'),
            401
        )

    salt = str(uuid.uuid4())
    hashed_code = hashlib.sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    expiry = int(time.time()) + AuthCodeAge
    user_id = db.get_user_id_from_number(user_number)
    db.save_reset_code(user_id, hashed_code, salt, expiry, 'password_reset')

    db.close()

    sendPasswordResetSMS(user_number, reset_code)

    return make_response(jsonify(f'sent sms to {user_number}'), 200)

@app.route('/code/validate/email', methods=['POST'])
def validate_email():
    req = flask.request.get_json()
    try:
        reset_code = req['reset_code']
        email = req['email']
    except KeyError:
        return make_response(
            jsonify('reset code not valid'),
            401
        )

    db = DB()

    user_id, salt, code_id = db.get_user_id_and_code_by_email(email)
    hashed_code = hashlib.sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    cur_time = int(time.time())

    valid = db.validate_code(user_id, hashed_code, cur_time)
    if not valid:
        return make_response(
            jsonify('reset code not valid.'),
            401
        )

    db.remove_reset_code(code_id)

    db.close()
    
    token = getJwt(user_id, AuthCodeAge)
    return make_response(jsonify(token), 200)

@app.route('/code/validate/sms', methods=['POST'])
def validate_sms():
    req = flask.request.get_json()
    try:
        reset_code = req['reset_code']
        phone_number = req['phone_number']
    except KeyError:
        return make_response(
            jsonify('code not valid'),
            401
        )

    db = DB()

    try:
        user_id, salt, code_id = db.get_user_id_and_code_by_number(phone_number)
    except TypeError as e:
        print(e)
        return make_response(
            jsonify('code not valid'),
            401
        )

    hashed_code = hashlib.sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    cur_time = int(time.time())

    valid = db.validate_code(user_id, hashed_code, cur_time)
    if not valid:
        return make_response(
            jsonify('reset code not valid.'),
            401
        )

    db.remove_reset_code(code_id)

    db.close()
    
    token = getJwt(user_id, AuthCodeAge)
    return make_response(jsonify(token), 200)

def revokeVerification(user_id: str, age: int):
    time.sleep(age)
    db = DB()
    if db.verify_code_exists(user_id):
        db.remove_verify_code(user_id)
        db.remove_user(user_id)
    db.close()

@app.route('/code/verify/sms', methods=['POST'])
def verify_sms():
    user_number = flask.request.get_data().decode('utf-8')
    reset_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])

    db = DB()

    if not db.user_number_exists(user_number):
        return make_response(
            jsonify('no user associated with this number.'),
            401
        )

    salt = str(uuid.uuid4())
    hashed_code = hashlib.sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    expiry = int(time.time()) + AuthCodeAge
    user_id = db.get_user_id_from_number(user_number)
    db.save_reset_code(user_id, hashed_code, salt, expiry, 'verify')

    db.close()

    sendVerifySMS(user_number, reset_code)

    revokeVerificationThread = threading.Thread(target=revokeVerification, args=(user_id, AuthCodeAge))
    revokeVerificationThread.start()   

    return make_response(jsonify(f'sent sms to {user_number}'), 200)

@app.route('/code/verify/email', methods=['POST'])
def verify_email():
    user_email = flask.request.get_data().decode('utf-8')
    reset_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])

    db = DB()

    if not db.user_email_exists(user_email):
        return make_response(
            jsonify('no user associated with this email.'),
            401
        )

    salt = str(uuid.uuid4())
    hashed_code = hashlib.sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    expiry = int(time.time()) + AuthCodeAge
    user_id = db.get_user_id_from_email(user_email)
    db.save_reset_code(user_id, hashed_code, salt, expiry, 'verify')

    db.close()

    sendVeryifyEmail(user_email, reset_code)

    revokeVerificationThread = threading.Thread(target=revokeVerification, args=(user_id, AuthCodeAge))
    revokeVerificationThread.start()   

    return make_response(jsonify(f'sent email to {user_email}'), 200)



@app.route('/user/delete', methods=['DELETE'])
def delete_user():
    try:
        access_token = flask.request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)

    dec_jwt = jwt.decode(access_token, public_key, algorithms='RS256')
    user_id = dec_jwt['user_id']

    db = DB()

    db.remove_user(user_id)

    db.close()

    return make_response(jsonify('removed used'), 200)