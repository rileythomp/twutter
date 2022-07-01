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
        post = req['post_text']
        is_public = req['is_public']
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

    if username_id == user_id:
        posts = postsDb.get_posts(user_id)
        postsDb.close()
        userDb.close()
        return make_response(jsonify(posts), 200)

    is_public = userDb.user_is_public(username)

    if not is_public:
        postsDb.close()
        userDb.close()
        return make_response(jsonify('user is private'), 403)

    posts = postsDb.get_public_posts(username_id)

    postsDb.close()
    userDb.close()
    
    return make_response(jsonify(posts), 200)

@posts.route('/posts/<id>', methods=['DELETE'])
def delete_post(id):
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    db = PostsRepo()
    db.delete_post(id, user_id)
    db.close()

    return make_response(jsonify('post deleted'), 200)

@posts.route('/posts/<id>', methods=['PUT'])
def edit_post(id):
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    req = request.get_json()
    try:
        post = req['post_text']
    except KeyError:
        return make_response(
            jsonify('error adding post'),
            400
        )

    updated_at = int(time())

    db = PostsRepo()
    db.edit_post(id, user_id, post, updated_at)
    db.close()

    return make_response(jsonify('post deleted'), 200)

@posts.route('/posts/privacy/<id>', methods=['PUT'])
def change_privacy(id):
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    req = request.get_json()
    try:
        is_public = req['is_public']
    except KeyError:
        return make_response(
            jsonify('error adding post'),
            400
        )

    db = PostsRepo()
    db.change_privacy(id, user_id, is_public)
    db.close()

    return make_response(jsonify('post deleted'), 200)

@posts.route('/posts/like/<id>', methods=['PUT'])
def like_post(id):
    try:
        access_token = request.headers['Access-Token']
    except:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token == '':
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = userIdFromJwt(access_token)

    liked_at = int(time())

    db = PostsRepo()
    db.like_post(id, user_id, liked_at)
    db.close()

    return make_response(jsonify('post liked'), 200)