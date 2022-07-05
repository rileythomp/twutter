from jwt import encode, decode

USER_ID = 'user_id'
BEARER = 'bearer'
CRYPT_ALG = 'RS256'
PRIVATE_KEY = 'jwtRS256.key'
PUBLIC_KEY = 'jwtRS256.key.pub'

class Token:
    def __init__(self, user_id, max_age):
        with open(PRIVATE_KEY, 'r') as file:
            private_key = file.read()
        enc_jwt = encode({
            USER_ID: user_id,
        }, private_key, algorithm=CRYPT_ALG)
        self.token = enc_jwt
        self.token_type = BEARER
        self.max_age = max_age

def GetUserIdFromJwt(token: str):
    with open(PUBLIC_KEY, 'r') as file:
        public_key = file.read()
    dec_jwt = decode(token, public_key, algorithms=CRYPT_ALG)
    return dec_jwt[USER_ID] if USER_ID in dec_jwt else ''