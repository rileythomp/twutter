from utils import userIdFromJwt
from flask import Blueprint, make_response, jsonify, request
from db import PostsRepo, UserRepo
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

    req = request.get_json()
    try:
        post = req['post']
        is_public = 1 if req['is_public'] == '1' else 0
    except KeyError:
        return make_response(
            jsonify('error adding post'),
            400
        )

    cur_time = int(time())

    db = PostsRepo()
    db.add_post(user_id, post, cur_time, cur_time, is_public)
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

@posts.route('/posts/<username>', methods=['GET'])
def get_posts_by_user(username):
    access_token = request.headers['Access-Token']

    if access_token == None or access_token == '':
        user_id = ''
    else:
        user_id = userIdFromJwt(access_token)

    userDb = UserRepo()

    username_id = userDb.get_user_id_from_name(username)

    postsDb = PostsRepo()

    if user_id == username_id:
        posts = postsDb.get_posts(user_id)
    else:
        posts = postsDb.get_public_posts(username_id)

    postsDb.close()
    
    return make_response(jsonify(posts), 200)
