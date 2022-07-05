import jsonpickle as jp
from flask import Blueprint, jsonify, request, make_response
from utils import userIdFromJwt
from time import time
from db import CommentsRepo, UserRepo

comments = Blueprint('comments', __name__)

@comments.route('/comments/add', methods=['POST'])
def add_comment():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    req = request.get_json()
    try:
        comment = req['comment']
        post_id = req['post_id']
    except KeyError:
        return make_response(jsonify('error adding comment'), 400)

    cur_time = int(time())

    db = CommentsRepo()
    db.add_comment(post_id, user_id, comment, cur_time)
    db.close()

    return make_response(jsonify(comment), 201)

@comments.route('/comments/<post_id>', methods=['GET'])
def get_post_comments(post_id):
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)
    userDb = UserRepo()
    user = userDb.get_user(user_id)
    userDb.close()
    if user is None:
        return make_response(jsonify('unable to authenticate user'), 401)
    
    db = CommentsRepo()
    comments = db.get_post_comments(post_id)
    db.close()

    return make_response(jp.encode(comments), 200)
