import jsonpickle as jp
from threading import Thread
from messages import sendPasswordResetEmail, sendPasswordResetSMS, sendVerifySMS, sendVerifyEmail
from random import randint
from flask import Blueprint, make_response, jsonify, request
from time import sleep, time 
from hashlib import sha256
from uuid import uuid4
from db import UserRepo, CodesRepo
from usertoken import Token, GetUserIdFromJwt
from psycopg2.errors import UniqueViolation

AUTH_CODE_AGE = 600 # 600 sec = 10 mins

SMS = 'sms'
EMAIL = 'email'
AllowedMethods = [SMS, EMAIL]

PASSWORD_RESET = 'passwordreset'
VERIFY = 'verify'
UPDATE = 'update'
AllowedActions = [VERIFY, PASSWORD_RESET]
AllowedAuthActions = [UPDATE]

codes = Blueprint('codes', __name__)

def revokeVerification(user_id: str, age: int):
    sleep(age)
    codesDb = CodesRepo()
    if codesDb.verify_code_expired(user_id):
        userDb = UserRepo()
        userDb.remove_user(user_id)
        userDb.close()
    codesDb.close()

def revokeCode(user_id: str, age: int, code_type: str):
    sleep(age)
    db = CodesRepo()
    db.remove_expired_code(user_id, code_type)
    db.close()
    
def genAuthCode():
    auth_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])
    salt = str(uuid4())
    hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
    expiry = int(time()) + AUTH_CODE_AGE
    return auth_code, salt, hashed_code, expiry


# Create codes for unauthenticated users

@codes.route('/code/create/<action>/<method>', methods=['POST'])
def create_code(action, method):
    if action not in AllowedActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods: 
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    user_contact = request.get_data().decode('utf-8')

    try:
        db = UserRepo()
        if method == EMAIL and not db.user_email_exists(user_contact):
            return make_response(jsonify('no user associated with this email.'), 401)
        if method == SMS and not db.user_number_exists(user_contact):
            return make_response(jsonify('no user associated with this number.'), 401)

        code, salt, hashed_code, expiry = genAuthCode()

        if method == EMAIL:
            user_id = db.get_user_id_from_email(user_contact)
        if method == SMS:
            user_id = db.get_user_id_from_number(user_contact)
        db.close()

        db = CodesRepo()
        db.save_auth_code(user_id, hashed_code, salt, expiry, action)
        db.close()
    except UniqueViolation:
        return make_response(jsonify('there is an existing code for this user'), 303)
    except Exception:
        return make_response(jsonify('error creating code'), 500)

    if action == PASSWORD_RESET and method == EMAIL:
        err = sendPasswordResetEmail(user_contact, code)
    elif action == PASSWORD_RESET and method == SMS:
        err = sendPasswordResetSMS(user_contact, code)
    elif action == VERIFY and method == EMAIL:
        err = sendVerifyEmail(user_contact, code)
    elif action == VERIFY and method == SMS:
        err = sendVerifySMS(user_contact, code)
    if err is not None:
        try:
            db = CodesRepo()
            db.remove_unsent_code(user_id, hashed_code, salt, expiry, action)
            db.close()
        except Exception: pass
        finally: return make_response(jsonify(f'error sending {method} code'), 500)

    if action == PASSWORD_RESET:
        revoke = revokeCode
        revArgs = (user_id, AUTH_CODE_AGE, PASSWORD_RESET)
    elif action == VERIFY:
        revoke = revokeVerification
        revArgs = (user_id, AUTH_CODE_AGE)
    revokeThread = Thread(target=revoke, args=revArgs)
    revokeThread.start()

    return make_response(jsonify(f'send {method} to {user_contact}'), 201)

# Create codes for authenticated users

@codes.route('/code/auth/create/<action>/<method>', methods=['POST'])
def create_auth_code(action, method):
    if action not in AllowedAuthActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods: 
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    user_contact = request.get_data().decode('utf-8')

    try:
        db = UserRepo()
        if method == EMAIL and db.user_email_exists(user_contact, user_id):
            db.close()
            return make_response(jsonify('email is already in use'), 401)
        elif method == SMS and db.user_number_exists(user_contact, user_id):
            db.close()
            return make_response(jsonify('phone number is already in use'), 401)
        db.close()

        code, salt, hashed_code, expiry = genAuthCode()

        db = CodesRepo()
        db.save_auth_code(user_id, hashed_code, salt, expiry, action)
        db.close()
    except UniqueViolation:
        return make_response(jsonify('there is an existing code for this user'), 303)
    except Exception:
        return make_response(jsonify('error creating code'), 500)

    if method == 'email':
        err = sendVerifyEmail(user_contact, code)
    elif method == 'sms':
        err = sendVerifySMS(user_contact, code)
    if err is not None:
        try:
            db = CodesRepo()
            db.remove_unsent_code(user_id, hashed_code, salt, expiry, action)
            db.close()
        except Exception: pass
        finally: return make_response(jsonify(f'error sending {method} code'), 500)

    revokeThread = Thread(target=revokeCode, args=(user_id, AUTH_CODE_AGE, UPDATE))
    revokeThread.start()

    return make_response(jsonify(f'sent {method} to {user_contact}'), 200)

# Validate unauthenticated users' codes

@codes.route('/code/validate/<action>/<method>', methods=['POST'])
def validate_code(action, method):
    if action not in AllowedActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods:
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    req = request.get_json()
    try:
        auth_code = req['auth_code']
        user_contact = req['user_contact']
    except KeyError:
        return make_response(jsonify('could not validate code'), 401)

    try:
        db = UserRepo()
        if method == 'email':
            user_id, salt, code_id = db.get_user_id_and_code_by_email(user_contact, action)
        elif method == 'sms':
            user_id, salt, code_id = db.get_user_id_and_code_by_number(user_contact, action)
        db.close()

        hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
        cur_time = int(time())
        
        db = CodesRepo()
        valid = db.validate_code(user_id, hashed_code, cur_time, action)
        if not valid:
            return make_response(jsonify('code not valid.'), 401)
        db.remove_auth_code(code_id, action)
        db.close()
    except TypeError:
        return make_response( jsonify('invalid contact info'), 401)
    except Exception:
        return make_response(jsonify('error validating code'), 500)
    
    token = Token(user_id, AUTH_CODE_AGE)
    return make_response(jp.encode(token), 200)

# Validate authenticated users' codes

@codes.route('/code/auth/validate/<action>/<method>', methods=['POST'])
def validate_auth_code(action, method):
    if action not in AllowedAuthActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods:
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    req = request.get_json()
    try:
        auth_code = req['auth_code']
    except KeyError:
        return make_response(jsonify('could not validate code'), 401)

    try:
        db = CodesRepo()

        salt, code_id = db.get_code_by_user_id(user_id, action)
        hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
        cur_time = int(time())

        valid = db.validate_code(user_id, hashed_code, cur_time, action)
        if not valid:
            return make_response(jsonify('code not valid'), 401)
        db.remove_auth_code(code_id, action)
        db.close()
    except Exception:
        return make_response(jsonify('error validating code'), 500)

    return make_response(jsonify(f'validated {method} code'), 200)