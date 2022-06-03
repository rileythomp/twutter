import jwt

def valid_password(password: str) -> bool:
    pw = set(password)
    return len(password) > 7 and len(password) < 65 and \
        len(pw.intersection('0123456789')) > 0 and \
        len(pw.intersection('abcdefghijklmnopqrstuvwxyz')) > 0 and \
        len(pw.intersection('ABCDEFGHIJKLMNOPQRSTUVWXYZ')) > 0

def getJwt(user_id, max_age):
    with open('jwtRS256.key', 'r') as file:
        private_key = file.read()
    enc_jwt = jwt.encode({
        'user_id': user_id,
    }, private_key, algorithm='RS256')

    return {
        'token': enc_jwt,
        'token_type': 'bearer',
        'max_age': max_age
    }