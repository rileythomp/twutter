from utils import getJwt
import threading
from messages import sendPasswordResetEmail, sendPasswordResetSMS, sendVerifySMS, sendVeryifyEmail
from random import randint
from flask import Blueprint, make_response, jsonify
import time
import hashlib
import uuid
import flask
from db import DB

AuthCodeAge = 600 # 10 mins

codes = Blueprint('codes', __name__)

@codes.route('/code/passwordreset/email', methods=['POST'])
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

@codes.route('/code/passwordreset/sms', methods=['POST'])
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

@codes.route('/code/validate/email', methods=['POST'])
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

@codes.route('/code/validate/sms', methods=['POST'])
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

    print(user_id, hashed_code, cur_time)
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

@codes.route('/code/verify/sms', methods=['POST'])
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

@codes.route('/code/verify/email', methods=['POST'])
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