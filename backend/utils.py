from jwt import encode

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