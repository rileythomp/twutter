from utils import userIdFromJwt
from flask import Blueprint, make_response, jsonify, request
from db import PostsRepo
from time import time

posts = Blueprint('posts', __name__)

@posts.route('/posts/add', methods=['POST'])
def add_post():
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    
    user_id = userIdFromJwt(access_token)
    post = request.get_data().decode('utf-8')
    cur_time = int(time())

    db = PostsRepo()
    db.add_post(user_id, post, cur_time, cur_time)
    db.close()

    return make_response(jsonify('added post'), 200)

@posts.route('/posts', methods=['GET'])
def get_posts():
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    
    user_id = userIdFromJwt(access_token)

    db = PostsRepo()
    posts = db.get_posts(user_id)
    db.close()

    return make_response(jsonify(posts), 200)