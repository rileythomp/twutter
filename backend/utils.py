from jwt import encode, decode

class Token:
    def __init__(self, token, token_type, max_age):
        self.token = token
        self.token_type = token_type
        self.max_age = max_age

def getJwt(user_id: str, max_age: int) -> Token:
    with open('jwtRS256.key', 'r') as file:
        private_key = file.read()
    enc_jwt = encode({
        'user_id': user_id,
    }, private_key, algorithm='RS256')
    return Token(enc_jwt, 'bearer', max_age)

def userIdFromJwt(token: str):
    with open('jwtRS256.key.pub', 'r') as file:
        public_key = file.read()
    dec_jwt = decode(token, public_key, algorithms='RS256')
    return dec_jwt['user_id'] if 'user_id' in dec_jwt else ''