from flask import Blueprint, jsonify, request, make_response
from utils import userIdFromJwt
from time import time
from db import CommentsRepo

comments = Blueprint('comments', __name__)

@comments.route('/comments/add', methods=['POST'])
def add_comment():
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    comment = request.get_data().decode('utf-8')
    cur_time = int(time())

    db = CommentsRepo()
    db.add_comment(user_id, comment, cur_time)
    db.close()

    return make_response(jsonify(comment), 201)

