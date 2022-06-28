from utils import getJwt
from threading import Thread
from messages import sendPasswordResetEmail, sendPasswordResetSMS, sendVerifySMS, sendVeryifyEmail
from random import randint
from flask import Blueprint, make_response, jsonify, request
from time import sleep, time 
from hashlib import sha256
from uuid import uuid4
from db import UserRepo, CodesRepo

AuthCodeAge = 600 # 10 mins

codes = Blueprint('codes', __name__)

def revokeVerification(user_id: str, age: int):
    sleep(age)
    codesDb = CodesRepo()
    if codesDb.verify_code_exists(user_id):
        codesDb.remove_verify_code(user_id)
        userDb = UserRepo()
        userDb.remove_user(user_id)
        userDb.close()
    codesDb.close()
    
def genAuthCode():
    reset_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])
    salt = str(uuid4())
    hashed_code = sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    expiry = int(time()) + AuthCodeAge
    return reset_code, salt, hashed_code, expiry

@codes.route('/code/passwordreset/email', methods=['POST'])
def email_password_reset():
    user_email = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_email_exists(user_email):
        return make_response(
            jsonify('no user associated with this email.'),
            401
        )

    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_email(user_email)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_reset_code(user_id, hashed_code, salt, expiry, 'password_reset')

    codesDb.close()

    sendPasswordResetEmail(user_email, code)

    return make_response(jsonify(f'sent email to {user_email}'), 200)

@codes.route('/code/passwordreset/sms', methods=['POST'])
def sms_password_reset():
    user_number = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_number_exists(user_number):
        return make_response(
            jsonify('no user associated with this number.'),
            401
        )

    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_number(user_number)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_reset_code(user_id, hashed_code, salt, expiry, 'password_reset')

    codesDb.close()

    sendPasswordResetSMS(user_number, code)

    return make_response(jsonify(f'sent sms to {user_number}'), 200)

@codes.route('/code/validate/email', methods=['POST'])
def validate_email():
    req = request.get_json()
    try:
        reset_code = req['reset_code']
        email = req['email']
    except KeyError:
        return make_response(
            jsonify('code not valid'),
            401
        )

    userDb = UserRepo()

    try:
        user_id, salt, code_id = userDb.get_user_id_and_code_by_email(email)
    except TypeError as e:
        return make_response(
            jsonify('code not valid'),
            401
        )
    
    userDb.close()
    
    hashed_code = sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    cur_time = int(time())
    
    codesDb = CodesRepo()

    valid = codesDb.validate_code(user_id, hashed_code, cur_time)
    if not valid:
        return make_response(
            jsonify('reset code not valid.'),
            401
        )

    codesDb.remove_reset_code(code_id)

    codesDb.close()
    
    token = getJwt(user_id, AuthCodeAge)
    return make_response(jsonify(token), 200)

@codes.route('/code/validate/sms', methods=['POST'])
def validate_sms():
    req = request.get_json()
    try:
        reset_code = req['reset_code']
        phone_number = req['phone_number']
    except KeyError:
        return make_response(
            jsonify('code not valid'),
            401
        )

    userDb = UserRepo()

    try:
        user_id, salt, code_id = userDb.get_user_id_and_code_by_number(phone_number)
    except TypeError as e:
        return make_response(
            jsonify('code not valid'),
            401
        )
        
    userDb.close()

    hashed_code = sha256(f'{reset_code}{salt}'.encode()).hexdigest()
    cur_time = int(time())

    codesDb = CodesRepo()
    
    valid = codesDb.validate_code(user_id, hashed_code, cur_time)
    if not valid:
        return make_response(
            jsonify('reset code not valid.'),
            401
        )

    codesDb.remove_reset_code(code_id)

    codesDb.close()
    
    token = getJwt(user_id, AuthCodeAge)
    return make_response(jsonify(token), 200)

@codes.route('/code/verify/sms', methods=['POST'])
def verify_sms():
    user_number = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_number_exists(user_number):
        return make_response(
            jsonify('no user associated with this number.'),
            401
        )

    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_number(user_number)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_reset_code(user_id, hashed_code, salt, expiry, 'verify')

    codesDb.close()

    sendVerifySMS(user_number, code)

    revokeVerificationThread = Thread(target=revokeVerification, args=(user_id, AuthCodeAge))
    revokeVerificationThread.start()   

    return make_response(jsonify(f'sent sms to {user_number}'), 200)

@codes.route('/code/verify/email', methods=['POST'])
def verify_email():
    user_email = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_email_exists(user_email):
        return make_response(
            jsonify('no user associated with this email.'),
            401
        )
    
    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_email(user_email)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_reset_code(user_id, hashed_code, salt, expiry, 'verify')

    codesDb.close()

    sendVeryifyEmail(user_email, code)

    revokeVerificationThread = Thread(target=revokeVerification, args=(user_id, AuthCodeAge))
    revokeVerificationThread.start()   

    return make_response(jsonify(f'sent email to {user_email}'), 200)