from jwt import encode, decode

def getJwt(user_id, max_age):
    with open('jwtRS256.key', 'r') as file:
        private_key = file.read()
    enc_jwt = encode({
        'user_id': user_id,
    }, private_key, algorithm='RS256')

    return {
        'token': enc_jwt,
        'token_type': 'bearer',
        'max_age': max_age
    }

def userIdFromJwt(token):
    with open('jwtRS256.key.pub', 'r') as file:
        public_key = file.read()
    dec_jwt = decode(token, public_key, algorithms='RS256')
    return dec_jwt['user_id']