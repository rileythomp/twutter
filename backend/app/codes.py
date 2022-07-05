import email
import json
from tabnanny import verbose
from utils import getJwt
from threading import Thread
from messages import sendPasswordResetEmail, sendPasswordResetSMS, sendVerifySMS, sendVerifyEmail
from random import randint
from flask import Blueprint, make_response, jsonify, request
from time import sleep, time 
from hashlib import sha256
from uuid import uuid4
from db import UserRepo, CodesRepo
from utils import userIdFromJwt

AUTH_CODE_AGE = 600 # 10 mins

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

def revokePasswordReset(user_id: str, age: int):
    sleep(age)
    db = CodesRepo()
    db.remove_expired_code(user_id, PASSWORD_RESET)
    db.close()

def revokeUpdate(user_id: str, age: int):
    sleep(age)
    db = CodesRepo()
    db.remove_expired_code(user_id, UPDATE)
    db.close()
    
def genAuthCode():
    auth_code = ''.join(['{}'.format(randint(0, 9)) for _ in range(0, 6)])
    salt = str(uuid4())
    hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
    expiry = int(time()) + AUTH_CODE_AGE
    return auth_code, salt, hashed_code, expiry

# Unauthenticated codes (account creation and password reset)

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
        # code_type = req['code_type']
    except KeyError:
        return make_response(jsonify('could not validate code'), 401)

    db = UserRepo()

    try:
        if method == 'email':
            user_id, salt, code_id = db.get_user_id_and_code_by_email(user_contact, action)
        elif method == 'sms':
            user_id, salt, code_id = db.get_user_id_and_code_by_number(user_contact, action)
    except TypeError as e:
        return make_response( jsonify('invalid contact info'), 401)
    
    db.close()
    
    hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
    cur_time = int(time())
    
    db = CodesRepo()

    valid = db.validate_code(user_id, hashed_code, cur_time, action)
    if not valid:
        return make_response(jsonify('code not valid.'), 401)

    db.remove_auth_code(code_id)

    db.close()
    
    token = getJwt(user_id, AUTH_CODE_AGE)
    return make_response(jsonify(token), 200)

# Create codes for unauthenticated users

@codes.route('/code/create/<action>/<method>', methods=['POST'])
def create_code(action, method):
    if action not in AllowedActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods: 
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    user_contact = request.get_data().decode('utf-8')

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

    if action == PASSWORD_RESET and method == EMAIL:
        err = sendPasswordResetEmail(user_contact, code)
    elif action == PASSWORD_RESET and method == SMS:
        err = sendPasswordResetSMS(user_contact, code)
    elif action == VERIFY and method == EMAIL:
        err = sendVerifyEmail(user_contact, code)
    elif action == VERIFY and method == SMS:
        err = sendVerifySMS(user_contact, code)
    if err is not None:
        return make_response(jsonify(f'error sending code'), 500)

    if action == PASSWORD_RESET:
        revokeCode = revokePasswordReset
    elif action == VERIFY:
        revokeCode = revokeVerification
    
    revokeThread = Thread(target=revokeCode, args=(user_id, AUTH_CODE_AGE))
    revokeThread.start()

    return make_response(jsonify(f'send {method} to {user_contact}'), 201)

# Authenticated codes (user update)

# Validate authenticated users' codes

@codes.route('/code/auth/validate/<action>/<method>', methods=['POST'])
def validate_auth_code(action, method):
    if action not in AllowedAuthActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods:
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    req = request.get_json()
    try:
        auth_code = req['auth_code']
        # user_contact = req['user_contact']
        # code_type = req['code_type']
    except KeyError:
        return make_response(jsonify('could not validate code'), 401)

    db = CodesRepo()

    salt, code_id = db.get_code_by_user_id(user_id, action)

    hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
    cur_time = int(time())

    valid = db.validate_code(user_id, hashed_code, cur_time, action)
    if not valid:
        return make_response(jsonify('code not valid'), 401)

    db.remove_auth_code(code_id)

    db.close()

    return make_response(jsonify(f'validated {method} code'), 200)

# Create codes for authenticated users

@codes.route('/code/auth/create/<action>/<method>', methods=['POST'])
def create_auth_code(action, method):
    if action not in AllowedAuthActions:
        return make_response(jsonify(f'{action} is not a valid action'), 400)
    if method not in AllowedMethods: 
        return make_response(jsonify(f'{method} is not a valid method'), 400)

    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    user_contact = request.get_data().decode('utf-8')

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

    if method == 'email':
        err = sendVerifyEmail(user_contact, code)
    elif method == 'sms':
        err = sendVerifySMS(user_contact, code)
    if err is not None:
        return make_response(jsonify(f'error sending {method}'), 500)

    revokeThread = Thread(target=revokeUpdate, args=(user_id, AUTH_CODE_AGE))
    revokeThread.start()

    return make_response(jsonify(f'sent {method} to {user_contact}'), 200)

"""

@codes.route('/code/validate/email', methods=['POST'])
def validate_email():
    req = request.get_json()
    try:
        auth_code = req['auth_code']
        email = req['email']
        code_type = req['code_type']
    except KeyError:
        return make_response(jsonify('could not validate code'), 401)

    userDb = UserRepo()

    try:
        user_id, salt, code_id = userDb.get_user_id_and_code_by_email(email, code_type)
    except TypeError as e:
        return make_response( jsonify('invalid email'), 401)
    
    userDb.close()
    
    hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
    cur_time = int(time())
    
    codesDb = CodesRepo()

    valid = codesDb.validate_code(user_id, hashed_code, cur_time, code_type)
    if not valid:
        return make_response(jsonify('code not valid.'), 401)

    codesDb.remove_auth_code(code_id)

    codesDb.close()
    
    token = getJwt(user_id, AUTH_CODE_AGE)
    return make_response(jsonify(token), 200)

@codes.route('/code/validate/sms', methods=['POST'])
def validate_sms():
    req = request.get_json()
    try:
        auth_code = req['auth_code']
        phone_number = req['phone_number']
        code_type = req['code_type']
    except KeyError:
        return make_response(jsonify('could not validate code'), 401)

    userDb = UserRepo()

    try:
        user_id, salt, code_id = userDb.get_user_id_and_code_by_number(phone_number, code_type)
    except TypeError as e:
        return make_response(jsonify('invalid phone number'), 401)
        
    userDb.close()

    hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
    cur_time = int(time())

    codesDb = CodesRepo()
    
    valid = codesDb.validate_code(user_id, hashed_code, cur_time, code_type)
    if not valid:
        return make_response(jsonify('code not valid.'), 401)

    codesDb.remove_auth_code(code_id)

    codesDb.close()
    
    token = getJwt(user_id, AUTH_CODE_AGE)
    return make_response(jsonify(token), 200)

@codes.route('/code/passwordreset/email', methods=['POST'])
def email_password_reset():
    user_email = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_email_exists(user_email):
        return make_response(jsonify('no user associated with this email.'), 401)

    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_email(user_email)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_auth_code(user_id, hashed_code, salt, expiry, PASSWORD_RESET)

    codesDb.close()

    err = sendPasswordResetEmail(user_email, code)
    if err is not None:
        return make_response(jsonify(f'error sending email'), 500)

    revokeThread = Thread(target=revokePasswordReset, args=(user_id, AUTH_CODE_AGE))
    revokeThread.start()   

    return make_response(jsonify(f'sent email to {user_email}'), 200)

@codes.route('/code/passwordreset/sms', methods=['POST'])
def sms_password_reset():
    user_number = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_number_exists(user_number):
        return make_response(jsonify('no user associated with this number.'), 401)

    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_number(user_number)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_auth_code(user_id, hashed_code, salt, expiry, PASSWORD_RESET)

    codesDb.close()

    err = sendPasswordResetSMS(user_number, code)
    if err is not None:
        return make_response(jsonify(f'error sending sms'), 500)

    revokeThread = Thread(target=revokePasswordReset, args=(user_id, AUTH_CODE_AGE))
    revokeThread.start()   

    return make_response(jsonify(f'sent sms to {user_number}'), 200)

@codes.route('/code/verify/email', methods=['POST'])
def verify_email():
    user_email = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_email_exists(user_email):
        return make_response(jsonify('no user associated with this email.'), 401)
    
    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_email(user_email)
    
    userDb.close()
    
    codesDb = CodesRepo()
    
    codesDb.save_auth_code(user_id, hashed_code, salt, expiry, VERIFY)

    codesDb.close()

    err = sendVerifyEmail(user_email, code)
    if err is not None:
        return make_response(jsonify(f'error sending email'), 500)

    revokeThread = Thread(target=revokeVerification, args=(user_id, AUTH_CODE_AGE))
    revokeThread.start()   

    return make_response(jsonify(f'sent email to {user_email}'), 200)

@codes.route('/code/verify/sms', methods=['POST'])
def verify_sms():
    user_number = request.get_data().decode('utf-8')

    userDb = UserRepo()

    if not userDb.user_number_exists(user_number):
        return make_response(jsonify('no user associated with this number.'), 401)

    code, salt, hashed_code, expiry = genAuthCode()
    user_id = userDb.get_user_id_from_number(user_number)
    
    userDb.close()
    
    codesDb = CodesRepo()
    

    codesDb.save_auth_code(user_id, hashed_code, salt, expiry, VERIFY)

    codesDb.close()

    err = sendVerifySMS(user_number, code)
    if err is not None:
        return make_response(jsonify(f'error sending sms'), 500)

    revokeThread = Thread(target=revokeVerification, args=(user_id, AUTH_CODE_AGE))
    revokeThread.start()   

    return make_response(jsonify(f'sent sms to {user_number}'), 200)
"""


# @codes.route('/code/update/email/validate', methods=['POST'])
# def validate_email_update():
#     try:
#         access_token = request.headers['Access-Token']
#     except:
#         return make_response(jsonify('unable to authenticate user'), 401)
#     if access_token == '':
#         return make_response(jsonify('unable to authenticate user'), 401)
#     user_id = userIdFromJwt(access_token)

#     req = request.get_json()
#     try:
#         auth_code = req['auth_code']
#         email = req['email']
#         code_type = req['code_type']
#     except KeyError:
#         return make_response(jsonify('could not validate code'), 401)

#     db = CodesRepo()

#     salt, code_id = db.get_code_by_user_id(user_id, code_type)

#     hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
#     cur_time = int(time())

#     valid = db.validate_code(user_id, hashed_code, cur_time, code_type)
#     if not valid:
#         return make_response(jsonify('code not valid'), 401)

#     db.remove_auth_code(code_id)

#     db.close()

#     return make_response(jsonify('validated email update'), 200)
 
# @codes.route('/code/update/sms/validate', methods=['POST'])
# def validate_sms_update():
#     try:
#         access_token = request.headers['Access-Token']
#     except:
#         return make_response(jsonify('unable to authenticate user'), 401)
#     if access_token == '':
#         return make_response(jsonify('unable to authenticate user'), 401)
#     user_id = userIdFromJwt(access_token)

#     req = request.get_json()
#     try:
#         auth_code = req['auth_code']
#         phone = req['phone_number']
#         code_type = req['code_type']
#     except KeyError:
#         return make_response(jsonify('could not validate code'), 401)

#     db = CodesRepo()

#     salt, code_id = db.get_code_by_user_id(user_id, code_type)

#     hashed_code = sha256(f'{auth_code}{salt}'.encode()).hexdigest()
#     cur_time = int(time())

#     valid = db.validate_code(user_id, hashed_code, cur_time, code_type)
#     if not valid:
#         return make_response(jsonify('code not valid'), 401)

#     db.remove_auth_code(code_id)

#     db.close()

#     return make_response(jsonify('validated sms update'), 200)

# @codes.route('/code/update/email', methods=['POST'])
# def update_email():
#     try:
#         access_token = request.headers['Access-Token']
#     except:
#         return make_response(jsonify('unable to authenticate user'), 401)
#     if access_token == '':
#         return make_response(jsonify('unable to authenticate user'), 401)
#     user_id = userIdFromJwt(access_token)

#     new_email = request.get_data().decode('utf-8')

#     db = UserRepo()
#     if db.user_email_exists(new_email, user_id):
#         db.close()
#         return make_response(jsonify('email is already in use'), 401)
#     db.close()

#     code, salt, hashed_code, expiry = genAuthCode()

#     db = CodesRepo()
#     db.save_auth_code(user_id, hashed_code, salt, expiry, UPDATE)
#     db.close()

#     err = sendVerifyEmail(new_email, code)
#     if err is not None:
#         return make_response(jsonify(f'error sending email'), 500)

#     revokeThread = Thread(target=revokeUpdate, args=(user_id, AUTH_CODE_AGE))
#     revokeThread.start()

#     return make_response(jsonify(f'sent email to {new_email}'), 200)

# @codes.route('/code/update/sms', methods=['POST'])
# def update_sms():
#     try:
#         access_token = request.headers['Access-Token']
#     except:
#         return make_response(jsonify('unable to authenticate user'), 401)
#     if access_token == '':
#         return make_response(jsonify('unable to authenticate user'), 401)
#     user_id = userIdFromJwt(access_token)

#     new_phone = request.get_data().decode('utf-8')

#     db = UserRepo()
#     if db.user_number_exists(new_phone, user_id):
#         db.close()
#         return make_response(jsonify('phone number is already in use'), 401)
#     db.close()

#     code, salt, hashed_code, expiry = genAuthCode()

#     db = CodesRepo()
#     db.save_auth_code(user_id, hashed_code, salt, expiry, UPDATE)
#     db.close()

#     err = sendVerifySMS(new_phone, code)
#     if err is not None:
#         return make_response(jsonify(f'error sending sms'), 500)

#     revokeThread = Thread(target=revokeUpdate, args=(user_id, AUTH_CODE_AGE))
#     revokeThread.start()

#     return make_response(jsonify(f'sent sms to {new_phone}'), 200)